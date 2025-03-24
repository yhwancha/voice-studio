"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Mic, Square, Play, Pause } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface VoiceRecorderProps {
  onAudioRecorded: (audioFile: { file: File; url: string }) => void
}

export default function VoiceRecorder({ onAudioRecorded }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false)
    }

    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })

      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: "audio/wav" })
        const url = URL.createObjectURL(audioBlob)

        setAudioBlob(audioBlob)
        setAudioUrl(url)

        // Stop all tracks from the stream
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)

      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }

  const togglePlayback = () => {
    if (!audioRef.current || !audioUrl) return

    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleSubmit = () => {
    if (audioBlob) {
      const file = new File([audioBlob], `recording-${Date.now()}.wav`, { type: "audio/wav" })
      onAudioRecorded({ file, url: audioUrl as string })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center justify-center gap-4 p-6 border rounded-lg">
        <div className="text-4xl font-mono tabular-nums">{formatTime(recordingTime)}</div>

        <Progress value={isRecording ? ((recordingTime % 60) / 60) * 100 : 0} className="w-full h-2" />

        <div className="flex gap-4">
          {!isRecording && !audioBlob ? (
            <Button onClick={startRecording} className="gap-2" size="lg">
              <Mic className="h-4 w-4" />
              Start Recording
            </Button>
          ) : isRecording ? (
            <Button onClick={stopRecording} variant="destructive" className="gap-2" size="lg">
              <Square className="h-4 w-4" />
              Stop Recording
            </Button>
          ) : (
            <>
              <Button onClick={togglePlayback} variant="outline" className="gap-2" size="lg">
                {isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    Play
                  </>
                )}
              </Button>

              <Button onClick={handleSubmit} className="gap-2" size="lg">
                Use This Recording
              </Button>
            </>
          )}
        </div>
      </div>

      {audioUrl && <audio ref={audioRef} src={audioUrl} className="hidden" />}

      <div className="text-sm text-muted-foreground text-center">
        {isRecording
          ? "Recording in progress... Speak clearly into your microphone."
          : !audioBlob
            ? "Click 'Start Recording' when you're ready to begin."
            : "Listen to your recording and click 'Use This Recording' if you're satisfied."}
      </div>
    </div>
  )
}

