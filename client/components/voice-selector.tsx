"use client"

import type React from "react"

import { useState } from "react"
import { Check, ChevronsUpDown, Upload } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const celebrityVoices = [
  { value: "morgan-freeman", label: "Morgan Freeman" },
  { value: "scarlett-johansson", label: "Scarlett Johansson" },
  { value: "james-earl-jones", label: "James Earl Jones" },
  { value: "emma-stone", label: "Emma Stone" },
  { value: "david-attenborough", label: "David Attenborough" },
  { value: "oprah-winfrey", label: "Oprah Winfrey" },
  { value: "ryan-reynolds", label: "Ryan Reynolds" },
  { value: "jennifer-lawrence", label: "Jennifer Lawrence" },
]

export default function VoiceSelector() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFile(e.target.files[0])
    }
  }

  const handleUpload = () => {
    // Here you would handle the actual upload and processing
    // For now, we'll just close the dialog and set a custom voice
    setUploadDialogOpen(false)
    setValue("custom")
  }

  return (
    <div className="flex gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
            {value
              ? value === "custom"
                ? `Custom Voice: ${uploadedFile?.name || "Uploaded"}`
                : celebrityVoices.find((voice) => voice.value === value)?.label
              : "Select voice..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px] p-0">
          <Command>
            <CommandInput placeholder="Search voices..." />
            <CommandList>
              <CommandEmpty>No voice found.</CommandEmpty>
              <CommandGroup heading="Celebrity Voices">
                {celebrityVoices.map((voice) => (
                  <CommandItem
                    key={voice.value}
                    value={voice.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", value === voice.value ? "opacity-100" : "opacity-0")} />
                    {voice.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Dialog open={uploadDialogOpen} onOpenChange={setUploadDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" className="flex-shrink-0">
            <Upload className="h-4 w-4 mr-2" />
            Upload
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Voice Sample</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="voice-file">Audio File</Label>
              <Input id="voice-file" type="file" accept="audio/*" onChange={handleFileChange} />
              <p className="text-sm text-muted-foreground">
                Upload a clear audio sample (MP3 or WAV) of the voice you want to mimic. For best results, use a 30-60
                second clip with minimal background noise.
              </p>
            </div>
            <Button onClick={handleUpload} disabled={!uploadedFile} className="w-full">
              Process Voice Sample
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

