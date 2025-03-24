"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { FileAudio, Upload, X } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface VoiceUploaderProps {
  onAudioUploaded: (audioFile: { file: File; url: string }) => void
}

export default function VoiceUploader({ onAudioUploaded }: VoiceUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)
  const [progress, setProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.type.startsWith("audio/")) {
        handleFileSelected(droppedFile)
      }
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelected(e.target.files[0])
    }
  }

  const handleFileSelected = (selectedFile: File) => {
    setFile(selectedFile)
    simulateUpload(selectedFile)
  }

  const simulateUpload = (selectedFile: File) => {
    setIsUploading(true)
    setProgress(0)

    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 10
        if (newProgress >= 100) {
          clearInterval(interval)
          setIsUploading(false)

          // Create object URL for the file
          const url = URL.createObjectURL(selectedFile)
          onAudioUploaded({ file: selectedFile, url })

          return 100
        }
        return newProgress
      })
    }, 300)
  }

  const handleRemoveFile = () => {
    setFile(null)
    setProgress(0)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="space-y-4">
      {!file ? (
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center ${isDragging ? "border-primary bg-primary/5" : "border-muted"}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="flex flex-col items-center justify-center gap-2">
            <FileAudio className="h-10 w-10 text-muted-foreground" />
            <h3 className="text-lg font-medium">Drag & drop your audio file</h3>
            <p className="text-sm text-muted-foreground mb-4">Supports MP3, WAV, M4A, FLAC (max 10MB)</p>
            <Button onClick={() => fileInputRef.current?.click()} className="gap-2">
              <Upload className="h-4 w-4" />
              Browse Files
            </Button>
            <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={handleFileChange} />
          </div>
        </div>
      ) : (
        <div className="border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <FileAudio className="h-5 w-5 text-primary" />
              <span className="font-medium truncate max-w-[200px]">{file.name}</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleRemoveFile} disabled={isUploading}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>{Math.round(file.size / 1024)} KB</span>
            <span>{progress}%</span>
          </div>
        </div>
      )}
    </div>
  )
}

