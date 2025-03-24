import { type NextRequest, NextResponse } from "next/server"

// Mock data for demonstration
const mockVoices = [
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

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const query = searchParams.get("q")

    if (!query) {
      return NextResponse.json({ error: "No search query provided" }, { status: 400 })
    }

    // In a real implementation, you would:
    // 1. Use an AI model to understand the query intent
    // 2. Search for matching voice presets in your database
    // 3. Return the results

    // For now, we'll simulate a delay and filter the mock data
    await new Promise((resolve) => setTimeout(resolve, 500))

    const filteredResults = mockVoices.filter(
      (voice) =>
        voice.name.toLowerCase().includes(query.toLowerCase()) ||
        voice.description.toLowerCase().includes(query.toLowerCase()) ||
        voice.category.toLowerCase().includes(query.toLowerCase()),
    )

    return NextResponse.json({
      success: true,
      results: filteredResults,
    })
  } catch (error) {
    console.error("Error searching voices:", error)
    return NextResponse.json({ error: "Failed to search voices" }, { status: 500 })
  }
}

