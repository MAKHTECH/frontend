"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers"
import { Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      await login(email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Invalid email or password")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-color p-4">
      <div className="w-full max-w-md rounded-lg border border-border-color bg-card-bg-color p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Sign In</h1>
          <p className="mt-2 text-text-color">Sign in to your account to continue</p>
        </div>

        {error && <div className="mb-4 rounded-md bg-error-color/10 p-3 text-error-color">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-text-color">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field mt-1 w-full"
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-text-color">
              Password
            </label>
            <div className="relative mt-1">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-field w-full pr-10"
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-color"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-input-border-color bg-input-bg-color text-button-active focus:ring-button-active"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-text-color">
                Remember me
              </label>
            </div>
            <Link href="/forgot-password" className="text-sm text-button-active hover:underline">
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full">
            {isLoading ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-text-color">Don't have an account?</span>{" "}
          <Link href="/register" className="text-button-active hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}

