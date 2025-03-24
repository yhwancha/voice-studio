import { Code, Server, Cpu, Globe, Sparkles, Headphones } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutProject() {
  return (
    <div className="space-y-12">
      {/* Project Overview */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-2xl font-bold mb-4">Project Overview</h3>
          <p className="text-muted-foreground mb-4">
            VoiceText Studio is an innovative AI-powered platform that transforms voice recordings with advanced machine
            learning technology. This project combines cutting-edge speech recognition, natural language processing, and
            voice synthesis to create a seamless voice transformation experience.
          </p>
          <p className="text-muted-foreground">
            The platform allows users to upload voice recordings, edit transcriptions, and generate new audio with the
            same or different voice, making it ideal for content creators, voice actors, and developers.
          </p>
        </div>
        <Card className="bg-secondary/50">
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center p-4">
                <Cpu className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">AI-Powered</h4>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Globe className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Accessible</h4>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">High Quality</h4>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <Headphones className="h-8 w-8 text-primary mb-2" />
                <h4 className="font-medium">Voice Transformation</h4>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Technology Stack */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-center">Technology Stack</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-2">Frontend Development</h4>
                <p className="text-muted-foreground">
                  The frontend of VoiceText Studio was developed with v0, Vercel's AI assistant, enabling rapid creation
                  of a responsive and intuitive user interface using Next.js and React.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Server className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-2">Backend Development</h4>
                <p className="text-muted-foreground">
                  The backend services were developed using Cursor AI, providing efficient API endpoints for audio
                  processing, transcription, and voice synthesis with optimized performance.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Cpu className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-xl font-bold mb-2">Speech Recognition</h4>
                <p className="text-muted-foreground">
                  VoiceText Studio leverages OpenAI's Whisper ASR technology for accurate speech recognition and
                  transcription, handling diverse accents and background noise with exceptional precision.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Development Process */}
      <div className="bg-secondary/30 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 text-center">Development Process</h3>
        <div className="space-y-6">
          <p className="text-center text-muted-foreground mb-6">
            VoiceText Studio was developed through a collaborative process leveraging cutting-edge AI tools and
            technologies.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="text-xl font-bold">Frontend Development</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Designed and implemented with v0, Vercel's AI assistant</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Built using Next.js App Router and React</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Styled with Tailwind CSS and shadcn/ui components</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Optimized for responsive design across all devices</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="text-xl font-bold">Backend Development</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Developed with Cursor AI for efficient code generation</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Integrated OpenAI Whisper ASR for speech recognition</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Implemented RESTful API endpoints for audio processing</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>Optimized for scalability and performance</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

