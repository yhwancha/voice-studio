import Link from "next/link"
import { ArrowRight, FileAudio, Mic, Wand2 } from "lucide-react"
import HeroIllustration from "@/components/hero-illustration"
import HowItWorks from "@/components/how-it-works"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section - Updated for dark mode */}
      <section className="relative w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <div className="container px-4 md:px-6 mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
            <div className="flex flex-col gap-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                Transform <span className="text-primary">Voice</span> to <span className="text-primary">Text</span> to{" "}
                <span className="text-primary">Voice</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-[600px]">
                Upload a voice, edit the transcription, and generate new audio with the same or different voice using
                our advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link
                  href="/studio"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#4285F4] text-white hover:bg-[#3b78e7] h-10 px-4 py-2 text-base"
                >
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="#how-it-works"
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 text-base"
                >
                  How It Works
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] w-full">
              <HeroIllustration />
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-xl">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <FileAudio className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Voice to Text</h3>
              <p className="text-muted-foreground">
                Upload or record your voice and get accurate transcriptions powered by Whisper AI.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-xl">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mic className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Edit & Refine</h3>
              <p className="text-muted-foreground">
                Review and edit the transcribed text to ensure perfect accuracy before generating new audio.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-muted rounded-xl">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Wand2 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold mb-2">Voice Transformation</h3>
              <p className="text-muted-foreground">
                Generate new audio using the same voice or transform it with a different voice reference.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full py-12 md:py-24 bg-muted/50" id="how-it-works">
        <div className="container px-4 md:px-6 mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <HowItWorks />
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-12 md:py-24 bg-background">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Voice?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start creating high-quality voice transformations in minutes.
            </p>
            <Link
              href="/studio"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#4285F4] text-white hover:bg-[#3b78e7] h-10 px-4 py-2 text-base"
            >
              Try VoiceText Studio Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

