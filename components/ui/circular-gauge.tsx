"use client"

import { type ReactNode, useEffect, useState } from "react"

interface CircularGaugeProps {
  value: number
  maxValue?: number
  size?: number
  strokeWidth?: number
  primaryColor?: string
  secondaryColor?: string
  showPercentage?: boolean
  percentageClassName?: string
  animate?: boolean
  animationDuration?: number
  className?: string
  children?: ReactNode
}

export default function CircularGauge({
  value,
  maxValue = 100,
  size = 200,
  strokeWidth = 15,
  primaryColor = "hsl(var(--primary))",
  secondaryColor = "hsl(var(--muted))",
  showPercentage = true,
  percentageClassName = "text-2xl font-semibold",
  animate = true,
  animationDuration = 1000,
  className = "",
  children,
}: CircularGaugeProps) {
  const [progress, setProgress] = useState(0)

  // Normalize value between 0 and maxValue
  const normalizedValue = Math.min(Math.max(0, value), maxValue)
  const percentage = (normalizedValue / maxValue) * 100

  // Calculate SVG parameters
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - (progress / 100) * circumference

  // Center position
  const center = size / 2

  useEffect(() => {
    if (animate) {
      // Reset progress if value is 0
      if (value === 0) {
        setProgress(0)
        return
      }

      // Animate progress
      const timer = setTimeout(() => {
        setProgress(percentage)
      }, 100)

      return () => clearTimeout(timer)
    } else {
      setProgress(percentage)
    }
  }, [percentage, animate, value])

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background circle */}
        <circle cx={center} cy={center} r={radius} fill="none" stroke={secondaryColor} strokeWidth={strokeWidth} />

        {/* Progress circle */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          fill="none"
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={{
            transition: animate ? `stroke-dashoffset ${animationDuration}ms ease` : "none",
          }}
        />
      </svg>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {showPercentage && <span className={percentageClassName}>{Math.round(normalizedValue)}%</span>}
        {children}
      </div>
    </div>
  )
}

