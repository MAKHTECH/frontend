import type { LucideIcon } from "lucide-react"
import { TrendingUp, TrendingDown } from "lucide-react"

interface CardProps {
  title: string
  value: string
  icon: LucideIcon
  trend: "up" | "down"
  percentage: string
}

export function Card({ title, value, icon: Icon, trend, percentage }: CardProps) {
  return (
    <div className="card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-text-color">{title}</h3>
        <Icon className="h-5 w-5 text-accent-color" />
      </div>
      <p className="text-2xl font-bold text-white mb-2">{value}</p>
      <div className="flex items-center">
        {trend === "up" ? (
          <TrendingUp className="mr-1 h-4 w-4 text-green-color" />
        ) : (
          <TrendingDown className="mr-1 h-4 w-4 text-error-color" />
        )}
        <span className={`text-sm ${trend === "up" ? "text-green-color" : "text-error-color"}`}>{percentage}%</span>
      </div>
    </div>
  )
}

