"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Play, Pause, Download, RefreshCw, Wand2 } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

type VoicePreset = {
  id: string
  name: string
  description: string
  category: string
  previewText?: string
  previewAudioUrl?: string
}

interface AudioPreviewProps {
  originalAudio: string | null
  newVoiceAudio: string | null
  generatedAudioUrl: string | null
  isLoading: boolean
  transformationType: "change-text" | "change-voice"
  originalText: string
  newText: string
  onSynthesize: () => void
  generatedAudioId: string | null
  selectedVoicePreset: VoicePreset | null
  newVoicePreset: VoicePreset | null
}

export default function AudioPreview({
  originalAudio,
  newVoiceAudio,
  generatedAudioUrl,
  isLoading,
  transformationType,
  originalText,
  newText,
  onSynthesize,
  generatedAudioId,
  selectedVoicePreset,
  newVoicePreset,
}: AudioPreviewProps) {
  const [isOriginalPlaying, setIsOriginalPlaying] = useState(false)
  const [isNewVoicePlaying, setIsNewVoicePlaying] = useState(false)
  const [isGeneratedPlaying, setIsGeneratedPlaying] = useState(false)

  const [originalCurrentTime, setOriginalCurrentTime] = useState(0)
  const [originalDuration, setOriginalDuration] = useState(0)
  const [newVoiceCurrentTime, setNewVoiceCurrentTime] = useState(0)
  const [newVoiceDuration, setNewVoiceDuration] = useState(0)
  const [generatedCurrentTime, setGeneratedCurrentTime] = useState(0)
  const [generatedDuration, setGeneratedDuration] = useState(0)

  const originalAudioRef = useRef<HTMLAudioElement | null>(null)
  const newVoiceAudioRef = useRef<HTMLAudioElement | null>(null)
  const generatedAudioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (originalAudioRef.current) {
      originalAudioRef.current.onplay = () => setIsOriginalPlaying(true)
      originalAudioRef.current.onpause = () => setIsOriginalPlaying(false)
      originalAudioRef.current.onended = () => setIsOriginalPlaying(false)
      originalAudioRef.current.ontimeupdate = () => setOriginalCurrentTime(originalAudioRef.current?.currentTime || 0)
      originalAudioRef.current.onloadedmetadata = () => setOriginalDuration(originalAudioRef.current?.duration || 0)
    }

    if (newVoiceAudioRef.current) {
      newVoiceAudioRef.current.onplay = () => setIsNewVoicePlaying(true)
      newVoiceAudioRef.current.onpause = () => setIsNewVoicePlaying(false)
      newVoiceAudioRef.current.onended = () => setIsNewVoicePlaying(false)
      newVoiceAudioRef.current.ontimeupdate = () => setNewVoiceCurrentTime(newVoiceAudioRef.current?.currentTime || 0)
      newVoiceAudioRef.current.onloadedmetadata = () => setNewVoiceDuration(newVoiceAudioRef.current?.duration || 0)
    }

    if (generatedAudioRef.current) {
      generatedAudioRef.current.onplay = () => setIsGeneratedPlaying(true)
      generatedAudioRef.current.onpause = () => setIsGeneratedPlaying(false)
      generatedAudioRef.current.onended = () => setIsGeneratedPlaying(false)
      generatedAudioRef.current.ontimeupdate = () =>
        setGeneratedCurrentTime(generatedAudioRef.current?.currentTime || 0)
      generatedAudioRef.current.onloadedmetadata = () => setGeneratedDuration(generatedAudioRef.current?.duration || 0)
    }
  }, [generatedAudioUrl, newVoiceAudio])

  const toggleOriginalPlayback = () => {
    if (!originalAudioRef.current) return

    if (isOriginalPlaying) {
      originalAudioRef.current.pause()
    } else {
      pauseAllExcept("original")
      originalAudioRef.current.play()
    }
  }

  const toggleNewVoicePlayback = () => {
    if (!newVoiceAudioRef.current) return

    if (isNewVoicePlaying) {
      newVoiceAudioRef.current.pause()
    } else {
      pauseAllExcept("new-voice")
      newVoiceAudioRef.current.play()
    }
  }

  const toggleGeneratedPlayback = () => {
    if (!generatedAudioRef.current) return

    if (isGeneratedPlaying) {
      generatedAudioRef.current.pause()
    } else {
      pauseAllExcept("generated")
      generatedAudioRef.current.play()
    }
  }

  const pauseAllExcept = (type: "original" | "new-voice" | "generated") => {
    if (type !== "original" && originalAudioRef.current && isOriginalPlaying) {
      originalAudioRef.current.pause()
    }

    if (type !== "new-voice" && newVoiceAudioRef.current && isNewVoicePlaying) {
      newVoiceAudioRef.current.pause()
    }

    if (type !== "generated" && generatedAudioRef.current && isGeneratedPlaying) {
      generatedAudioRef.current.pause()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const getTransformationDescription = () => {
    switch (transformationType) {
      case "change-text":
        return selectedVoicePreset
          ? `${selectedVoicePreset.name} speaking new text`
          : "Original voice speaking new text"
      case "change-voice":
        return newVoicePreset ? `${newVoicePreset.name} speaking original text` : "New voice speaking original text"
      default:
        return ""
    }
  }

  const getTextToDisplay = () => {
    switch (transformationType) {
      case "change-text":
        return newText
      case "change-voice":
        return originalText
      default:
        return ""
    }
  }

  const getVoiceDescription = () => {
    if (transformationType === "change-text") {
      return selectedVoicePreset
        ? `Voice: ${selectedVoicePreset.name} (${selectedVoicePreset.description})`
        : "Voice: Original uploaded audio"
    } else {
      return newVoicePreset
        ? `Voice: ${newVoicePreset.name} (${newVoicePreset.description})`
        : newVoiceAudio
          ? "Voice: New uploaded audio"
          : "No voice selected"
    }
  }

  const handleDownload = () => {
    if (generatedAudioId) {
      window.open(`/api/download/${generatedAudioId}`, "_blank")
    }
  }

  return (
    <div className="space-y-6">
      {originalAudio && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">Original Audio</h3>
            <div className="flex items-center gap-4 mb-2">
              <Button onClick={toggleOriginalPlayback} variant="outline" size="icon" disabled={!originalAudio}>
                {isOriginalPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <div className="flex-1">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-muted-foreground"
                    style={{ width: `${(originalCurrentTime / originalDuration) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm tabular-nums">
                {formatTime(originalCurrentTime)} / {formatTime(originalDuration)}
              </div>
            </div>
            {originalAudio && <audio ref={originalAudioRef} src={originalAudio} className="hidden" />}
            <div className="mt-2 text-sm text-muted-foreground">
              <p>Original Text: {originalText}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedVoicePreset && transformationType === "change-text" && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">Selected Voice: {selectedVoicePreset.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{selectedVoicePreset.description}</p>
            {selectedVoicePreset.previewText && (
              <p className="text-sm italic mb-2">Sample: "{selectedVoicePreset.previewText}"</p>
            )}
          </CardContent>
        </Card>
      )}

      {transformationType === "change-voice" && newVoiceAudio && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">New Voice Reference</h3>
            <div className="flex items-center gap-4 mb-2">
              <Button onClick={toggleNewVoicePlayback} variant="outline" size="icon" disabled={!newVoiceAudio}>
                {isNewVoicePlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              <div className="flex-1">
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-muted-foreground"
                    style={{ width: `${(newVoiceCurrentTime / newVoiceDuration) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-sm tabular-nums">
                {formatTime(newVoiceCurrentTime)} / {formatTime(newVoiceDuration)}
              </div>
            </div>
            {newVoiceAudio && <audio ref={newVoiceAudioRef} src={newVoiceAudio} className="hidden" />}
          </CardContent>
        </Card>
      )}

      {transformationType === "change-voice" && newVoicePreset && (
        <Card>
          <CardContent className="p-4">
            <h3 className="text-lg font-medium mb-2">Selected Voice: {newVoicePreset.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">{newVoicePreset.description}</p>
            {newVoicePreset.previewText && (
              <p className="text-sm italic mb-2">Sample: "{newVoicePreset.previewText}"</p>
            )}
          </CardContent>
        </Card>
      )}

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-2">
            Generated Audio
            {(isLoading || generatedAudioUrl) && (
              <span className="text-sm font-normal text-muted-foreground ml-2">({getTransformationDescription()})</span>
            )}
          </h3>

          {!generatedAudioUrl && !isLoading && (
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/30">
                <p className="text-sm">{getTextToDisplay() || "No text selected yet."}</p>
                <p className="text-sm mt-2 text-muted-foreground">{getVoiceDescription()}</p>
              </div>

              <Button onClick={onSynthesize} className="w-full gap-2">
                <Wand2 className="h-4 w-4" />
                Generate Audio
              </Button>
            </div>
          )}

          {isLoading && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-md" />
                <div className="flex-1">
                  <Skeleton className="h-2 w-full" />
                </div>
                <Skeleton className="h-6 w-16" />
              </div>
              <div className="flex items-center justify-center py-8">
                <RefreshCw className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
              <p className="text-center text-muted-foreground">Generating audio... This may take a moment.</p>
            </div>
          )}

          {generatedAudioUrl && !isLoading && (
            <>
              <div className="flex items-center gap-4 mb-4">
                <Button onClick={toggleGeneratedPlayback} variant="outline" size="icon">
                  {isGeneratedPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <div className="flex-1">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary"
                      style={{ width: `${(generatedCurrentTime / generatedDuration) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="text-sm tabular-nums">
                  {formatTime(generatedCurrentTime)} / {formatTime(generatedDuration)}
                </div>
              </div>

              <div className="p-4 border rounded-lg bg-muted/30 mb-4">
                <p className="text-sm">{getTextToDisplay()}</p>
                <p className="text-sm mt-2 text-muted-foreground">{getVoiceDescription()}</p>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleDownload} className="gap-2">
                  <Download className="h-4 w-4" />
                  Download Audio
                </Button>
              </div>

              <audio ref={generatedAudioRef} src={generatedAudioUrl} className="hidden" />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

