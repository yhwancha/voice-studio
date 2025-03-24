import { FileAudio, Edit, Wand2, Play, Download } from "lucide-react"

export default function HowItWorks() {
  return (
    <div className="relative">
      {/* Vertical line connecting steps */}
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 -translate-x-1/2 hidden md:block"></div>

      <div className="space-y-12 relative">
        {/* Step 1 */}
        <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
          <div className="md:text-right mb-4 md:mb-0">
            <div className="flex md:justify-end items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold z-10">
                1
              </div>
              <h3 className="text-xl font-bold md:order-first">Upload or Record Voice</h3>
            </div>
            <p className="mt-2 text-muted-foreground">
              Start by uploading an audio file or recording your voice directly in the browser.
            </p>
          </div>
          <div className="bg-secondary rounded-xl p-6 flex items-center justify-center">
            <FileAudio className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
          <div className="order-last md:order-first mb-4 md:mb-0">
            <div className="bg-secondary rounded-xl p-6 flex items-center justify-center">
              <Edit className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold z-10">
                2
              </div>
              <h3 className="text-xl font-bold">Review & Edit Transcription</h3>
            </div>
            <p className="mt-2 text-muted-foreground">
              Our AI transcribes your audio. Review and edit the text to ensure accuracy.
            </p>
          </div>
        </div>

        {/* Step 3 */}
        <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
          <div className="md:text-right mb-4 md:mb-0">
            <div className="flex md:justify-end items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold z-10">
                3
              </div>
              <h3 className="text-xl font-bold md:order-first">Choose Transformation Option</h3>
            </div>
            <p className="mt-2 text-muted-foreground">
              Decide whether to keep the original voice with new text, or use a new voice with the original text.
            </p>
          </div>
          <div className="bg-secondary rounded-xl p-6 flex items-center justify-center">
            <Wand2 className="h-12 w-12 text-primary" />
          </div>
        </div>

        {/* Step 4 */}
        <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
          <div className="order-last md:order-first mb-4 md:mb-0">
            <div className="bg-secondary rounded-xl p-6 flex items-center justify-center">
              <Play className="h-12 w-12 text-primary" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold z-10">
                4
              </div>
              <h3 className="text-xl font-bold">Generate & Preview</h3>
            </div>
            <p className="mt-2 text-muted-foreground">
              Our AI generates the new audio based on your choices. Preview it instantly in the browser.
            </p>
          </div>
        </div>

        {/* Step 5 */}
        <div className="md:grid md:grid-cols-2 md:gap-8 items-center">
          <div className="md:text-right mb-4 md:mb-0">
            <div className="flex md:justify-end items-center gap-4">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold z-10">
                5
              </div>
              <h3 className="text-xl font-bold md:order-first">Download & Share</h3>
            </div>
            <p className="mt-2 text-muted-foreground">
              Download your transformed audio file in high quality or share it directly.
            </p>
          </div>
          <div className="bg-secondary rounded-xl p-6 flex items-center justify-center">
            <Download className="h-12 w-12 text-primary" />
          </div>
        </div>
      </div>
    </div>
  )
}

