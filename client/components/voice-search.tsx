"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Play, Pause, Check } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"

type VoicePreset = {
  id: string
  name: string
  description: string
  category: string
  previewText?: string
  previewAudioUrl?: string
}

interface VoiceSearchProps {
  onVoiceSelected: (voice: VoicePreset) => void
}

export default function VoiceSearch({ onVoiceSelected }: VoiceSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearching, setIsSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<VoicePreset[]>([])
  const [playingId, setPlayingId] = useState<string | null>(null)
  const [selectedVoice, setSelectedVoice] = useState<VoicePreset | null>(null)

  // Mock data for demonstration
  const mockVoices: VoicePreset[] = [
    {
      id: "rdj-1",
      name: "Robert Downey Jr.",
      description: "Tony Stark / Iron Man voice",
      category: "celebrity",
      previewText: "Sometimes you gotta run before you can walk.",
      previewAudioUrl: "/api/get_voice/rdj-1",
    },
    {
      id: "morgan-freeman-1",
      name: "Morgan Freeman",
      description: "Deep, authoritative narrator voice",
      category: "celebrity",
      previewText: "I've always believed that you should never give up and you should always keep fighting.",
      previewAudioUrl: "/api/get_voice/morgan-freeman-1",
    },
    {
      id: "wizard-1",
      name: "Wise Wizard",
      description: "Elderly, mystical wizard voice",
      category: "character",
      previewText: "Magic is not just about power, but about wisdom and responsibility.",
      previewAudioUrl: "/api/get_voice/wizard-1",
    },
    {
      id: "anime-girl-1",
      name: "Anime Girl",
      description: "High-pitched, energetic anime character",
      category: "character",
      previewText: "I'll do my best! Let's go on an adventure together!",
      previewAudioUrl: "/api/get_voice/anime-girl-1",
    },
  ]

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsSearching(true)

    try {
      // In a real implementation, this would be an API call
      // const response = await fetch(`/api/search_voices?q=${encodeURIComponent(searchQuery)}`)
      // const data = await response.json()

      // For now, we'll simulate a delay and filter the mock data
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const filteredResults = mockVoices.filter(
        (voice) =>
          voice.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          voice.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          voice.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )

      setSearchResults(filteredResults)
    } catch (error) {
      console.error("Error searching voices:", error)
    } finally {
      setIsSearching(false)
    }
  }

  const togglePlayPreview = (id: string) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
      // In a real implementation, this would play the audio preview
      // For now, we'll simulate playing for 3 seconds
      setTimeout(() => {
        setPlayingId(null)
      }, 3000)
    }
  }

  const handleSelectVoice = (voice: VoicePreset) => {
    setSelectedVoice(voice)
    onVoiceSelected(voice)
  }

  useEffect(() => {
    // Auto-search after typing stops
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        handleSearch()
      }
    }, 500)

    return () => clearTimeout(delayDebounceFn)
  }, [searchQuery])

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <Input
          placeholder="Search for a voice (e.g., 'Tony Stark', 'wizard', 'anime')"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleSearch} disabled={isSearching}>
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>

      {isSearching && (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      )}

      {!isSearching && searchResults.length === 0 && searchQuery && (
        <div className="text-center py-8 text-muted-foreground">
          No voices found matching "{searchQuery}". Try a different search term.
        </div>
      )}

      {!isSearching && searchResults.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-medium">Search Results</h3>
          <div className="grid gap-4">
            {searchResults.map((voice) => (
              <Card
                key={voice.id}
                className={`overflow-hidden transition-colors ${selectedVoice?.id === voice.id ? "border-primary" : ""}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium">{voice.name}</h4>
                      <p className="text-sm text-muted-foreground">{voice.description}</p>
                      {voice.previewText && <p className="text-sm italic mt-2">"{voice.previewText}"</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={() => togglePlayPreview(voice.id)}>
                        {playingId === voice.id ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </Button>
                      <Button
                        variant={selectedVoice?.id === voice.id ? "default" : "outline"}
                        size="icon"
                        onClick={() => handleSelectVoice(voice)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

