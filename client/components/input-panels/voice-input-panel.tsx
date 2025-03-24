"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Square } from "lucide-react"

interface VoiceInputPanelProps {
  onTranscription: (text: string) => void
  onSend: () => void
}

export default function VoiceInputPanel({ onTranscription, onSend }: VoiceInputPanelProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)

  // In a real app, this would use the Web Audio API and a speech-to-text service
  const startRecording = () => {
    setIsRecording(true)

    // Simulate recording with a timer
    const interval = setInterval(() => {
      setRecordingTime((prev) => prev + 1)
    }, 1000)

    // Simulate stopping after 5 seconds
    setTimeout(() => {
      clearInterval(interval)
      stopRecording()
    }, 5000)
  }

  const stopRecording = () => {
    setIsRecording(false)

    // Simulate transcription
    setTimeout(() => {
      onTranscription("This is a simulated voice transcription for the story.")
      setRecordingTime(0)
      onSend()
    }, 1000)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="text-center">
        {isRecording ? (
          <div className="text-red-500 animate-pulse font-medium">Recording... {formatTime(recordingTime)}</div>
        ) : (
          <div className="text-muted-foreground">Press the microphone button to start recording</div>
        )}
      </div>

      <div className="flex gap-4">
        {!isRecording ? (
          <Button
            onClick={startRecording}
            size="lg"
            className="rounded-full h-16 w-16 flex items-center justify-center"
          >
            <Mic className="h-6 w-6" />
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            variant="destructive"
            size="lg"
            className="rounded-full h-16 w-16 flex items-center justify-center"
          >
            <Square className="h-6 w-6" />
          </Button>
        )}
      </div>
    </div>
  )
}

