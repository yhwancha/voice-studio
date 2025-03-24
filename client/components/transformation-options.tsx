"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Edit } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import VoiceUploader from "./voice-uploader"
import VoiceRecorder from "./voice-recorder"
import VoiceSearch from "./voice-search"
import TranscriptionEditor from "./transcription-editor"

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

interface TransformationOptionsProps {
  originalAudio: AudioFile | null
  originalText: string
  onOptionSelected: (type: "change-text" | "change-voice", customText?: string) => void
  onNewVoiceUploaded: (audioFile: AudioFile) => void
  onNewVoicePresetSelected: (voicePreset: VoicePreset) => void
  transformationType: "change-text" | "change-voice"
  newVoiceAudio: AudioFile | null
  newVoiceTranscription: Transcription | null
  editedNewVoiceText: string
  onNewVoiceTextChange: (text: string) => void
  onNewVoiceTranscriptionConfirm: () => void
  selectedVoicePreset: VoicePreset | null
}

export default function TransformationOptions({
  originalAudio,
  originalText,
  onOptionSelected,
  onNewVoiceUploaded,
  onNewVoicePresetSelected,
  transformationType,
  newVoiceAudio,
  newVoiceTranscription,
  editedNewVoiceText,
  onNewVoiceTextChange,
  onNewVoiceTranscriptionConfirm,
  selectedVoicePreset,
}: TransformationOptionsProps) {
  const [customText, setCustomText] = useState("")
  const [newVoiceMethod, setNewVoiceMethod] = useState<"upload" | "record" | "ai-agent">("ai-agent")

  const handleOptionChange = (value: string) => {
    const option = value as "change-text" | "change-voice"
    onOptionSelected(option)
  }

  const handleSubmitChangeText = () => {
    onOptionSelected("change-text", customText || originalText)
  }

  return (
    <div className="space-y-6">
      <RadioGroup value={transformationType} onValueChange={handleOptionChange} className="space-y-4">
        <div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="change-text" id="option-1" />
            <Label htmlFor="option-1" className="font-medium">
              Option A: Change Text, Keep Original Voice
            </Label>
          </div>
          <p className="text-sm text-muted-foreground ml-6 mt-1">Use the original voice to speak new text.</p>
        </div>

        <div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="change-voice" id="option-2" />
            <Label htmlFor="option-2" className="font-medium">
              Option B: Change Voice, Keep Original Text
            </Label>
          </div>
          <p className="text-sm text-muted-foreground ml-6 mt-1">Use a new voice to speak the original text.</p>
        </div>
      </RadioGroup>

      {transformationType === "change-text" && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Enter New Text</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="new-text">New Text</Label>
                  <span className="text-xs text-muted-foreground">{customText.length} characters</span>
                </div>
                <Textarea
                  id="new-text"
                  placeholder={originalText || "Enter the new text you want the original voice to speak..."}
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="min-h-[150px]"
                />
              </div>
              <Button onClick={handleSubmitChangeText} className="w-full gap-2">
                <Edit className="h-4 w-4" />
                Continue with New Text
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {transformationType === "change-voice" && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Select New Voice</h3>
            <Tabs defaultValue="ai-agent" onValueChange={(value) => setNewVoiceMethod(value as any)}>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="ai-agent">AI Voice Agent</TabsTrigger>
                <TabsTrigger value="upload">Upload Audio</TabsTrigger>
                <TabsTrigger value="record">Record Voice</TabsTrigger>
              </TabsList>

              <TabsContent value="ai-agent" className="pt-4">
                <VoiceSearch onVoiceSelected={onNewVoicePresetSelected} />
              </TabsContent>

              <TabsContent value="upload" className="pt-4">
                <VoiceUploader onAudioUploaded={onNewVoiceUploaded} />
              </TabsContent>

              <TabsContent value="record" className="pt-4">
                <VoiceRecorder onAudioRecorded={onNewVoiceUploaded} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}

      {transformationType === "change-voice" && newVoiceAudio && newVoiceTranscription && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-4">Review New Voice Transcription</h3>
            <TranscriptionEditor
              originalAudio={newVoiceAudio}
              transcription={newVoiceTranscription.text}
              segments={newVoiceTranscription.segments}
              editedText={editedNewVoiceText}
              onTextChange={onNewVoiceTextChange}
              onConfirm={onNewVoiceTranscriptionConfirm}
            />
          </CardContent>
        </Card>
      )}
    </div>
  )
}

