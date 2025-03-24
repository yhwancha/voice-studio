import React from "react"
import { Check, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type StepStatus = "idle" | "loading" | "complete" | "error"

interface StepProps {
  title: string
  description?: string
  status?: StepStatus
}

export function Step({ title, description, status = "idle" }: StepProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          "w-10 h-10 rounded-full flex items-center justify-center border-2",
          status === "idle" && "border-muted-foreground text-muted-foreground",
          status === "loading" && "border-primary text-primary",
          status === "complete" && "border-primary bg-primary text-primary-foreground",
          status === "error" && "border-destructive text-destructive",
        )}
      >
        {status === "loading" && <Loader2 className="h-5 w-5 animate-spin" />}
        {status === "complete" && <Check className="h-5 w-5" />}
        {(status === "idle" || status === "error") && <span>{title.charAt(0)}</span>}
      </div>
      <div className="mt-2 text-center">
        <div className="font-medium">{title}</div>
        {description && <div className="text-xs text-muted-foreground">{description}</div>}
      </div>
    </div>
  )
}

interface StepperProps {
  currentStep: number
  children: React.ReactNode
  className?: string
}

export function Stepper({ currentStep, children, className }: StepperProps) {
  const steps = React.Children.toArray(children)

  return (
    <div className={cn("w-full", className)}>
      <div className="flex justify-between">
        {steps.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className="flex-1 flex items-center">
                <div className={cn("h-0.5 w-full", index <= currentStep ? "bg-primary" : "bg-muted-foreground/30")} />
              </div>
            )}
            <div className={cn("transition-opacity", index === currentStep ? "opacity-100" : "opacity-70")}>{step}</div>
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}

