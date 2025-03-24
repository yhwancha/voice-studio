"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Play, Pause, Check } from "lucide-react"

interface TranscriptionEditorProps {
  originalAudio: { file: File; url: string; id?: string } | null
  transcription: string
  segments?: Array<{
    id: number
    start: number
    end: number
    text: string
  }>
  editedText: string
  onTextChange: (text: string) => void
  onConfirm: () => void
}

export default function TranscriptionEditor({
  originalAudio,
  transcription,
  segments = [],
  editedText,
  onTextChange,
  onConfirm,
}: TranscriptionEditorProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [activeSegment, setActiveSegment] = useState<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onplay = () => setIsPlaying(true)
      audioRef.current.onpause = () => setIsPlaying(false)
      audioRef.current.onended = () => setIsPlaying(false)
      audioRef.current.ontimeupdate = () => {
        const time = audioRef.current?.currentTime || 0
        setCurrentTime(time)

        // Update active segment
        const segment = segments.find((seg) => time >= seg.start && time <= seg.end)
        setActiveSegment(segment?.id ?? null)
      }
      audioRef.current.onloadedmetadata = () => setDuration(audioRef.current?.duration || 0)
    }
  }, [segments])

  const togglePlayback = () => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <div className="space-y-4">
      {originalAudio && (
        <div className="border rounded-lg p-4">
          <div className="flex items-center gap-4 mb-2">
            <Button onClick={togglePlayback} variant="outline" size="icon">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <div className="flex-1">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary" style={{ width: `${(currentTime / duration) * 100}%` }}></div>
              </div>
            </div>
            <div className="text-sm tabular-nums">
              {formatTime(currentTime)} / {formatTime(duration)}
            </div>
          </div>
          <audio ref={audioRef} src={originalAudio.url} className="hidden" />

          {segments.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm font-medium">Segments:</p>
              <div className="space-y-1">
                {segments.map((segment) => (
                  <div
                    key={segment.id}
                    className={`p-2 rounded text-sm ${activeSegment === segment.id ? "bg-primary/10 border border-primary/30" : "bg-muted"}`}
                    onClick={() => {
                      if (audioRef.current) {
                        audioRef.current.currentTime = segment.start
                        audioRef.current.play()
                      }
                    }}
                  >
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>{formatTime(segment.start)}</span>
                      <span>{formatTime(segment.end)}</span>
                    </div>
                    <p>{segment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="transcription" className="text-sm font-medium">
            Edit Transcription
          </label>
          <span className="text-xs text-muted-foreground">{editedText.length} characters</span>
        </div>
        <Textarea
          id="transcription"
          value={editedText}
          onChange={(e) => onTextChange(e.target.value)}
          className="min-h-[200px] font-mono"
          placeholder="The transcription will appear here. You can edit it if needed."
        />
      </div>

      <div className="flex justify-end">
        <Button onClick={onConfirm} className="gap-2">
          <Check className="h-4 w-4" />
          Confirm Transcription
        </Button>
      </div>
    </div>
  )
}

