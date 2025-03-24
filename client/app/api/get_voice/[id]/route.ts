import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const mockVoices = {
  "rdj-1": {
    id: "rdj-1",
    name: "Robert Downey Jr.",
    description: "Tony Stark / Iron Man voice",
    category: "celebrity",
    previewText: "Sometimes you gotta run before you can walk.",
    previewAudioUrl: "/api/get_voice/rdj-1",
  },
  "morgan-freeman-1": {
    id: "morgan-freeman-1",
    name: "Morgan Freeman",
    description: "Deep, authoritative narrator voice",
    category: "celebrity",
    previewText: "I've always believed that you should never give up and you should always keep fighting.",
    previewAudioUrl: "/api/get_voice/morgan-freeman-1",
  },
  "wizard-1": {
    id: "wizard-1",
    name: "Wise Wizard",
    description: "Elderly, mystical wizard voice",
    category: "character",
    previewText: "Magic is not just about power, but about wisdom and responsibility.",
    previewAudioUrl: "/api/get_voice/wizard-1",
  },
  "anime-girl-1": {
    id: "anime-girl-1",
    name: "Anime Girl",
    description: "High-pitched, energetic anime character",
    category: "character",
    previewText: "I'll do my best! Let's go on an adventure together!",
    previewAudioUrl: "/api/get_voice/anime-girl-1",
  },
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const voiceId = params.id

    if (!voiceId) {
      return NextResponse.json({ error: "No voice ID provided" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Retrieve the voice preset details from your database
    // 2. Return the voice preset details and/or audio file

    // For now, we'll check if the voice exists in our mock data
    if (!mockVoices[voiceId]) {
      return NextResponse.json({ error: "Voice not found" }, { status: 404 })
    }

    // In a real implementation, this would return the audio file
    // For now, we'll return the voice details
    return NextResponse.json({
      success: true,
      voice: mockVoices[voiceId],
    })
  } catch (error) {
    console.error("Error retrieving voice:", error)
    return NextResponse.json({ error: "Failed to retrieve voice" }, { status: 500 })
  }
}

