export default function HeroIllustration() {
  // Dark mode colors
  const primaryColor = "#3B82F6" // Blue
  const secondaryColor = "#60A5FA" // Lighter blue
  const accentColor = "#93C5FD" // Even lighter blue
  const bgColor = "#1E293B" // Dark blue-gray
  const textColor = "#F1F5F9" // Light gray

  return (
    <div className="relative w-full h-full">
      <svg
        viewBox="0 0 800 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        aria-hidden="true"
      >
        {/* Background */}
        <rect width="800" height="600" rx="20" fill={bgColor} />

        {/* Decorative circles */}
        <circle cx="650" cy="100" r="50" fill={accentColor} fillOpacity="0.2" />
        <circle cx="700" cy="200" r="30" fill={accentColor} fillOpacity="0.15" />
        <circle cx="600" cy="250" r="20" fill={accentColor} fillOpacity="0.25" />

        {/* Main device illustration */}
        <rect
          x="150"
          y="150"
          width="500"
          height="300"
          rx="15"
          fill={textColor}
          fillOpacity="0.05"
          stroke={primaryColor}
          strokeWidth="2"
        />

        {/* Screen */}
        <rect x="180" y="180" width="440" height="240" rx="5" fill={textColor} fillOpacity="0.03" />

        {/* Waveform visualization */}
        <path
          d="M200 300 Q220 250, 240 300 Q260 350, 280 300 Q300 250, 320 300 Q340 350, 360 300 Q380 250, 400 300 Q420 350, 440 300 Q460 250, 480 300 Q500 350, 520 300 Q540 250, 560 300 Q580 350, 600 300"
          stroke={primaryColor}
          strokeWidth="3"
          fill="none"
        />

        {/* Secondary waveform */}
        <path
          d="M200 320 Q230 290, 260 320 Q290 350, 320 320 Q350 290, 380 320 Q410 350, 440 320 Q470 290, 500 320 Q530 350, 560 320 Q590 290, 600 320"
          stroke={secondaryColor}
          strokeWidth="2"
          fill="none"
          opacity="0.7"
        />

        {/* Microphone icon */}
        <circle cx="250" cy="400" r="25" fill={primaryColor} />
        <rect x="245" y="385" width="10" height="20" rx="5" fill={textColor} fillOpacity="0.9" />
        <path d="M235 400 L265 400" stroke={textColor} strokeWidth="2" />
        <path d="M250 405 L250 420" stroke={textColor} strokeWidth="2" />
        <path d="M240 420 L260 420" stroke={textColor} strokeWidth="2" />

        {/* Text to speech icon */}
        <circle cx="400" cy="400" r="25" fill={secondaryColor} />
        <path d="M390 395 L410 395 L410 405 L390 405 Z" fill={textColor} fillOpacity="0.9" />
        <path d="M415 390 Q425 400, 415 410" stroke={textColor} strokeWidth="2" fill="none" />
        <path d="M420 385 Q435 400, 420 415" stroke={textColor} strokeWidth="2" fill="none" />

        {/* Voice transformation icon */}
        <circle cx="550" cy="400" r="25" fill={accentColor} />
        <path d="M540 400 L560 400" stroke={textColor} strokeWidth="2" />
        <path d="M540 395 L560 405" stroke={textColor} strokeWidth="2" />
        <path d="M540 405 L560 395" stroke={textColor} strokeWidth="2" />

        {/* Connection lines */}
        <path d="M275 400 L375 400" stroke={primaryColor} strokeWidth="2" strokeDasharray="5 3" />
        <path d="M425 400 L525 400" stroke={secondaryColor} strokeWidth="2" strokeDasharray="5 3" />

        {/* Text labels */}
        <text x="400" y="120" textAnchor="middle" fontSize="24" fontWeight="bold" fill={textColor}>
          Voice Transformation Technology
        </text>
        <text x="250" y="450" textAnchor="middle" fontSize="14" fill={textColor}>
          Voice Input
        </text>
        <text x="400" y="450" textAnchor="middle" fontSize="14" fill={textColor}>
          AI Processing
        </text>
        <text x="550" y="450" textAnchor="middle" fontSize="14" fill={textColor}>
          New Voice
        </text>
      </svg>
    </div>
  )
}

