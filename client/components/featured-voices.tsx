"use client"

import { useState } from "react"
import Image from "next/image"
import { Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Celebrity = {
  id: string
  name: string
  image: string
  sampleText: string
}

const celebrities: Celebrity[] = [
  {
    id: "morgan-freeman",
    name: "Morgan Freeman",
    image: "/placeholder.svg?height=100&width=100",
    sampleText:
      "I've always believed that you should never, ever give up and you should always keep fighting even when there's only a slightest chance.",
  },
  {
    id: "scarlett-johansson",
    name: "Scarlett Johansson",
    image: "/placeholder.svg?height=100&width=100",
    sampleText:
      "I believe that luck is opportunity meeting preparation. I've had a fair amount of luck, but I've also worked really hard.",
  },
  {
    id: "james-earl-jones",
    name: "James Earl Jones",
    image: "/placeholder.svg?height=100&width=100",
    sampleText: "One of the hardest things in life is having words in your heart that you can't utter.",
  },
  {
    id: "emma-stone",
    name: "Emma Stone",
    image: "/placeholder.svg?height=100&width=100",
    sampleText:
      "What sets you apart can sometimes feel like a burden and it's not. And a lot of the time, it's what makes you great.",
  },
]

export default function FeaturedVoices() {
  const [playingId, setPlayingId] = useState<string | null>(null)

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {celebrities.map((celebrity) => (
        <Card key={celebrity.id} className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative h-48 bg-gradient-to-b from-primary/20 to-background">
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={celebrity.image || "/placeholder.svg"}
                  alt={celebrity.name}
                  width={100}
                  height={100}
                  className="rounded-full border-4 border-background"
                />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{celebrity.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{celebrity.sampleText}</p>
              <Button variant="outline" size="sm" className="w-full" onClick={() => togglePlay(celebrity.id)}>
                {playingId === celebrity.id ? (
                  <>
                    <Pause className="h-4 w-4 mr-2" />
                    Stop Sample
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Play Sample
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

