import type React from "react"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // In a real app, you would check if the user is already authenticated here
  // and redirect to dashboard if they are

  return <div className="min-h-screen bg-bg-main-color">{children}</div>
}

