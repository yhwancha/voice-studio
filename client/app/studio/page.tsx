"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Stepper, Step } from "@/components/stepper"
import VoiceUploader from "@/components/voice-uploader"
import VoiceRecorder from "@/components/voice-recorder"
import VoiceSearch from "@/components/voice-search"
import TranscriptionEditor from "@/components/transcription-editor"
import TransformationOptions from "@/components/transformation-options"
import AudioPreview from "@/components/audio-preview"

type AudioFile = {
  file: File
  url: string
  id?: string
}

type VoicePreset = {
  id: string
  name: string
  description: string
  category: string
  previewText?: string
  previewAudioUrl?: string
}

type Transcription = {
  text: string
  language: string
  segments: Array<{
    id: number
    start: number
    end: number
    text: string
  }>
  audio_id: string
}

type StepStatus = "idle" | "loading" | "complete" | "error"

export default function StudioPage() {
  // Main workflow state
  const [currentStep, setCurrentStep] = useState(0)
  const [stepStatus, setStepStatus] = useState<StepStatus[]>(["idle", "idle", "idle", "idle"])

  // Voice input method
  const [voiceInputMethod, setVoiceInputMethod] = useState<"upload" | "record" | "ai-agent">("upload")

  // AI Agent voice selection
  const [selectedVoicePreset, setSelectedVoicePreset] = useState<VoicePreset | null>(null)

  // Audio and transcription state
  const [originalAudio, setOriginalAudio] = useState<AudioFile | null>(null)
  const [originalTranscription, setOriginalTranscription] = useState<Transcription | null>(null)
  const [editedOriginalText, setEditedOriginalText] = useState("")

  // New voice state (for option B)
  const [newVoiceAudio, setNewVoiceAudio] = useState<AudioFile | null>(null)
  const [newVoiceTranscription, setNewVoiceTranscription] = useState<Transcription | null>(null)
  const [editedNewVoiceText, setEditedNewVoiceText] = useState("")
  const [newVoicePreset, setNewVoicePreset] = useState<VoicePreset | null>(null)

  // Transformation options
  const [transformationType, setTransformationType] = useState<"change-text" | "change-voice">("change-text")
  const [newText, setNewText] = useState("")

  // Generated audio state
  const [generatedAudioId, setGeneratedAudioId] = useState<string | null>(null)
  const [generatedAudioUrl, setGeneratedAudioUrl] = useState<string | null>(null)

  // Handle AI Agent voice selection
  const handleVoicePresetSelected = (voicePreset: VoicePreset) => {
    setSelectedVoicePreset(voicePreset)

    // When a voice preset is selected, we can move directly to the text input step
    // since we don't need to transcribe anything
    setStepStatus((prev) => {
      const newStatus = [...prev]
      newStatus[0] = "complete"
      return newStatus
    })

    // Set a default text from the voice preset or an empty string
    setEditedOriginalText(voicePreset.previewText || "")

    // Move to the text editing step
    setCurrentStep(1)
  }

  // Handle audio upload or recording
  const handleAudioUploaded = async (audioFile: AudioFile, isNewVoice = false) => {
    if (isNewVoice) {
      setNewVoiceAudio(audioFile)
    } else {
      setOriginalAudio(audioFile)
    }

    setStepStatus((prev) => {
      const newStatus = [...prev]
      newStatus[isNewVoice ? 2 : 0] = "loading"
      return newStatus
    })

    try {
      // Upload the audio file
      const uploadFormData = new FormData()
      uploadFormData.append("audio", audioFile.file)

      const uploadResponse = await fetch("/api/upload_audio", {
        method: "POST",
        body: uploadFormData,
      })

      const uploadData = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || "Failed to upload audio")
      }

      // Update the audio file with the ID
      const audioWithId = {
        ...audioFile,
        id: uploadData.audio_id,
      }

      if (isNewVoice) {
        setNewVoiceAudio(audioWithId)
      } else {
        setOriginalAudio(audioWithId)
      }

      // Transcribe the audio
      const transcribeFormData = new FormData();
      // 여기서 audioFile.file을 "audio.mp3"라는 이름으로 추가합니다.
      transcribeFormData.append("file", audioFile.file, "audio.mp3");

      console.log(transcribeFormData);

      const transcribeResponse = await fetch("/api/voices/transcribe", {
        method: "POST",
        body: transcribeFormData,
      });
      const transcriptionData = await transcribeResponse.json()

      console.log(transcriptionData)

      if (!transcribeResponse.ok) {
        throw new Error(transcriptionData.error || "Failed to transcribe audio")
      }

      // Update the transcription state
      if (isNewVoice) {
        setNewVoiceTranscription(transcriptionData)
        setEditedNewVoiceText(transcriptionData.text)
      } else {
        setOriginalTranscription(transcriptionData)
        setEditedOriginalText(transcriptionData.text)
      }

      setStepStatus((prev) => {
        const newStatus = [...prev]
        newStatus[isNewVoice ? 2 : 0] = "complete"
        return newStatus
      })

      // Move to the next step
      if (!isNewVoice) {
        setCurrentStep(1)
      }
    } catch (error) {
      console.error("Error processing audio:", error)
      setStepStatus((prev) => {
        const newStatus = [...prev]
        newStatus[isNewVoice ? 2 : 0] = "error"
        return newStatus
      })
    }
  }

  // Handle transcription confirmation
  const handleTranscriptionConfirmed = (isNewVoice = false) => {
    if (isNewVoice) {
      // If confirming new voice transcription, move to synthesis
      setStepStatus((prev) => {
        const newStatus = [...prev]
        newStatus[2] = "complete"
        return newStatus
      })

      // Prepare for synthesis based on transformation type
      if (transformationType === "change-voice") {
        setNewText(editedOriginalText)
      }

      setCurrentStep(3)
    } else {
      // If confirming original transcription, move to transformation options
      setStepStatus((prev) => {
        const newStatus = [...prev]
        newStatus[1] = "complete"
        return newStatus
      })

      setCurrentStep(2)
    }
  }

  // Handle transformation option selection
  const handleTransformationSelected = async (type: "change-text" | "change-voice", customText?: string) => {
    setTransformationType(type)

    // Option A: Change text, keep original voice
    if (type === "change-text" && customText !== undefined) {
      setNewText(customText)

      setStepStatus((prev) => {
        const newStatus = [...prev]
        newStatus[2] = "complete"
        return newStatus
      })

      setCurrentStep(3)
    }
    // Option B: Change voice, keep original text - handled separately
  }

  // Handle new voice selection for Option B
  const handleNewVoiceSelected = (voicePreset: VoicePreset) => {
    setNewVoicePreset(voicePreset)

    // When a voice preset is selected for Option B, we can move directly to synthesis
    setStepStatus((prev) => {
      const newStatus = [...prev]
      newStatus[2] = "complete"
      return newStatus
    })

    // Move to the synthesis step
    setCurrentStep(3)
  }

  // Handle new voice upload for Option B
  const handleNewVoiceUploaded = (audioFile: AudioFile) => {
    handleAudioUploaded(audioFile, true)
  }

  // Handle synthesis
  const handleSynthesis = async () => {
    setStepStatus((prev) => {
      const newStatus = [...prev]
      newStatus[3] = "loading"
      return newStatus
    })

    try {
      const synthesizeFormData = new FormData()

      // Add text based on transformation type
      if (transformationType === "change-text") {
        synthesizeFormData.append("text", newText)
      } else if (transformationType === "change-voice") {
        synthesizeFormData.append("text", editedOriginalText)
      }

      // Add reference audio based on transformation type and source
      if (transformationType === "change-text") {
        if (selectedVoicePreset) {
          synthesizeFormData.append("voice_preset_id", selectedVoicePreset.id)
        } else {
          synthesizeFormData.append("reference_audio_id", originalAudio?.id || "")
        }
      } else {
        // Change voice option
        if (newVoicePreset) {
          synthesizeFormData.append("voice_preset_id", newVoicePreset.id)
        } else if (newVoiceAudio) {
          synthesizeFormData.append("reference_audio_id", newVoiceAudio.id || "")
        }
      }

      const synthesizeResponse = await fetch("/api/synthesize", {
        method: "POST",
        body: synthesizeFormData,
      })

      const synthesizeData = await synthesizeResponse.json()

      if (!synthesizeResponse.ok) {
        throw new Error(synthesizeData.error || "Failed to synthesize speech")
      }

      setGeneratedAudioId(synthesizeData.audio_id)

      // In a real implementation, you would use the audio ID to create a URL
      setGeneratedAudioUrl(`/api/download/${synthesizeData.audio_id}`)

      setStepStatus((prev) => {
        const newStatus = [...prev]
        newStatus[3] = "complete"
        return newStatus
      })
    } catch (error) {
      console.error("Error synthesizing speech:", error)
      setStepStatus((prev) => {
        const newStatus = [...prev]
        newStatus[3] = "error"
        return newStatus
      })
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">VoiceText Studio</h1>
      </div>

      <Stepper currentStep={currentStep} className="mb-8">
        <Step title="Voice Input" description="Upload, record, or select voice" status={stepStatus[0]} />
        <Step title="Transcription" description="Review and edit the text" status={stepStatus[1]} />
        <Step title="Choose Option" description="Select transformation type" status={stepStatus[2]} />
        <Step title="Synthesis & Download" description="Listen and save your audio" status={stepStatus[3]} />
      </Stepper>

      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-6">
          {currentStep === 0 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Voice Input</h2>
              <Tabs defaultValue="upload" onValueChange={(value) => setVoiceInputMethod(value as any)}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="upload">Upload Audio</TabsTrigger>
                  <TabsTrigger value="record">Record Voice</TabsTrigger>
                  <TabsTrigger value="ai-agent">AI Voice Agent</TabsTrigger>
                </TabsList>
                <TabsContent value="upload" className="pt-4">
                  <VoiceUploader onAudioUploaded={handleAudioUploaded} />
                </TabsContent>
                <TabsContent value="record" className="pt-4">
                  <VoiceRecorder onAudioRecorded={handleAudioUploaded} />
                </TabsContent>
                <TabsContent value="ai-agent" className="pt-4">
                  <VoiceSearch onVoiceSelected={handleVoicePresetSelected} />
                </TabsContent>
              </Tabs>
            </div>
          )}

          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">
                {voiceInputMethod === "ai-agent" ? "Enter or Edit Text" : "Transcription Review & Edit"}
              </h2>
              {voiceInputMethod === "ai-agent" ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Enter the text you want the selected voice to speak, or use the suggested text.
                  </p>
                  <TranscriptionEditor
                    originalAudio={null}
                    transcription={selectedVoicePreset?.previewText || ""}
                    segments={[]}
                    editedText={editedOriginalText}
                    onTextChange={setEditedOriginalText}
                    onConfirm={() => handleTranscriptionConfirmed(false)}
                  />
                </div>
              ) : (
                <TranscriptionEditor
                  originalAudio={originalAudio}
                  transcription={originalTranscription?.text || ""}
                  segments={originalTranscription?.segments || []}
                  editedText={editedOriginalText}
                  onTextChange={setEditedOriginalText}
                  onConfirm={() => handleTranscriptionConfirmed(false)}
                />
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Choose Transformation Option</h2>
              <TransformationOptions
                originalAudio={originalAudio}
                originalText={editedOriginalText}
                onOptionSelected={handleTransformationSelected}
                onNewVoiceUploaded={handleNewVoiceUploaded}
                onNewVoicePresetSelected={handleNewVoiceSelected}
                transformationType={transformationType}
                newVoiceAudio={newVoiceAudio}
                newVoiceTranscription={newVoiceTranscription}
                editedNewVoiceText={editedNewVoiceText}
                onNewVoiceTextChange={setEditedNewVoiceText}
                onNewVoiceTranscriptionConfirm={() => handleTranscriptionConfirmed(true)}
                selectedVoicePreset={selectedVoicePreset}
              />
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold">Synthesis & Download</h2>
              <AudioPreview
                originalAudio={originalAudio?.url}
                newVoiceAudio={newVoiceAudio?.url}
                generatedAudioUrl={generatedAudioUrl}
                isLoading={stepStatus[3] === "loading"}
                transformationType={transformationType}
                originalText={editedOriginalText}
                newText={newText}
                onSynthesize={handleSynthesis}
                generatedAudioId={generatedAudioId}
                selectedVoicePreset={selectedVoicePreset}
                newVoicePreset={newVoicePreset}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

