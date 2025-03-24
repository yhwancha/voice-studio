"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { InputType, OutputType, ContentItem, Message } from "@/types/story"
import { Video, Sparkles } from "lucide-react"
import TextInputPanel from "./input-panels/text-input-panel"
import VoiceInputPanel from "./input-panels/voice-input-panel"
import PhotoInputPanel from "./input-panels/photo-input-panel"
import VideoInputPanel from "./input-panels/video-input-panel"

interface ChatInterfaceProps {
  inputType: InputType
  outputType: OutputType
  content: ContentItem[]
  onContentUpdate: (content: ContentItem[]) => void
  onTitleUpdate: (title: string) => void
}

// Simulate AI response generation
const generateAIResponse = async (message: string, inputType: InputType, outputType: OutputType): Promise<Message> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real app, this would call an AI API
  let response = ""

  if (message.toLowerCase().includes("title")) {
    response = 'How about "The Adventurous Journey" for your story title?'
  } else if (message.toLowerCase().includes("generate") || message.toLowerCase().includes("create")) {
    if (outputType === "storybook") {
      response = "I've generated a new scene for your storybook. You can see it in the preview panel."
    } else if (outputType === "video") {
      response = "I've created a new video segment for your story. Check the preview to see how it looks."
    } else if (outputType === "audio") {
      response = "I've generated a new audio narration for your story. You can listen to it in the preview panel."
    } else {
      response = "I've expanded your story with new content. You can edit it in the preview panel."
    }
  } else {
    response = "I'm your AI storytelling assistant. How would you like to develop your story further?"
  }

  return {
    role: "assistant",
    content: response,
    timestamp: Date.now(),
  }
}

// Simulate content generation based on user input
const generateContent = (message: string, inputType: InputType, outputType: OutputType): ContentItem[] => {
  if (message.toLowerCase().includes("generate") || message.toLowerCase().includes("create")) {
    if (outputType === "storybook" || outputType === "text") {
      return [
        {
          type: "text",
          content:
            "Once upon a time in a magical forest, a young explorer discovered a hidden path that led to an ancient temple. The temple walls were covered in mysterious symbols that seemed to glow in the dim light.",
          timestamp: Date.now(),
        },
        {
          type: "image",
          content: `/placeholder.svg?height=300&width=500&text=${encodeURIComponent("Ancient Temple in Forest")}`,
          timestamp: Date.now(),
        },
      ]
    } else if (outputType === "video") {
      return [
        {
          type: "video",
          content: `/placeholder.svg?height=300&width=500&text=${encodeURIComponent("Video Story Segment")}`,
          timestamp: Date.now(),
        },
      ]
    } else if (outputType === "audio") {
      return [
        {
          type: "audio",
          content: "Audio narration would play here",
          timestamp: Date.now(),
        },
      ]
    }
  }

  return []
}

export default function ChatInterface({
  inputType,
  outputType,
  content,
  onContentUpdate,
  onTitleUpdate,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "system",
      content: `Welcome to StorySketch! I'll help you create a ${outputType} using ${inputType} input. What would you like to create today?`,
      timestamp: Date.now(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && inputType === "text") return

    const userMessage: Message = {
      role: "user",
      content: inputMessage,
      timestamp: Date.now(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputMessage("")
    setIsProcessing(true)

    // Generate AI response
    const aiResponse = await generateAIResponse(inputMessage, inputType, outputType)
    setMessages((prev) => [...prev, aiResponse])

    // Generate content based on the message
    const newContent = generateContent(inputMessage, inputType, outputType)
    if (newContent.length > 0) {
      onContentUpdate([...content, ...newContent])
    }

    // Update title if requested
    if (inputMessage.toLowerCase().includes("title")) {
      onTitleUpdate("The Adventurous Journey")
    }

    setIsProcessing(false)
  }

  const renderInputPanel = () => {
    switch (inputType) {
      case "text":
        return (
          <TextInputPanel
            value={inputMessage}
            onChange={setInputMessage}
            onSend={handleSendMessage}
            isProcessing={isProcessing}
          />
        )
      case "voice":
        return <VoiceInputPanel onTranscription={setInputMessage} onSend={handleSendMessage} />
      case "photo":
        return (
          <PhotoInputPanel
            onUpload={(url) => {
              const userMessage: Message = {
                role: "user",
                content: "I've uploaded an image for my story.",
                timestamp: Date.now(),
                attachments: [{ type: "image", url }],
              }
              setMessages((prev) => [...prev, userMessage])
            }}
          />
        )
      case "video":
        return (
          <VideoInputPanel
            onUpload={(url) => {
              const userMessage: Message = {
                role: "user",
                content: "I've uploaded a video for my story.",
                timestamp: Date.now(),
                attachments: [{ type: "video", url }],
              }
              setMessages((prev) => [...prev, userMessage])
            }}
          />
        )
      default:
        return (
          <TextInputPanel
            value={inputMessage}
            onChange={setInputMessage}
            onSend={handleSendMessage}
            isProcessing={isProcessing}
          />
        )
    }
  }

  return (
    <Card className="h-[calc(100vh-12rem)] flex flex-col">
      <Tabs defaultValue="chat">
        <TabsList className="w-full justify-start px-4 pt-2">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="flex-1 flex flex-col h-full">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : message.role === "system"
                          ? "bg-muted"
                          : "bg-secondary"
                    }`}
                  >
                    <p>{message.content}</p>
                    {message.attachments?.map((attachment, i) => (
                      <div key={i} className="mt-2">
                        {attachment.type === "image" && (
                          <div className="relative h-40 w-full rounded overflow-hidden">
                            <img
                              src={attachment.url || "/placeholder.svg"}
                              alt="User uploaded"
                              className="object-cover w-full h-full"
                            />
                          </div>
                        )}
                        {attachment.type === "video" && (
                          <div className="relative h-40 w-full rounded overflow-hidden bg-black flex items-center justify-center">
                            <Video className="h-10 w-10 text-white opacity-50" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          <div className="p-4 border-t">{renderInputPanel()}</div>
        </TabsContent>

        <TabsContent value="suggestions" className="h-full">
          <ScrollArea className="h-[calc(100vh-16rem)] p-4">
            <div className="space-y-2">
              <h3 className="font-medium mb-3">Try these prompts:</h3>
              {[
                "Generate a story about a magical forest",
                "Create a character who discovers a hidden treasure",
                "Add a plot twist to my story",
                "Suggest a title for my story",
                "Make the story more exciting",
                "Add a new character to the story",
                "Change the setting to a beach",
                "Make the ending more surprising",
              ].map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2 px-3 mb-2"
                  onClick={() => {
                    setInputMessage(suggestion)
                  }}
                >
                  <Sparkles className="h-4 w-4 mr-2 text-primary" />
                  {suggestion}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </Card>
  )
}

