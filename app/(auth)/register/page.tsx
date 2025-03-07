"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/app/providers"
import { Eye, EyeOff } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsLoading(true)

    try {
      await register(username, email, password)
      router.push("/dashboard")
    } catch (err) {
      setError("Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-bg-color p-4">
      <div className="w-full max-w-md rounded-lg border border-border-color bg-card-bg-color p-8">
        <div className="mb-6 text-center">
          <h1 className="text-2xl font-bold text-white">Create Account</h1>
          <p className="mt-2 text-text-color">Sign up to get started</p>
        </div>

        {error && <div className="mb-4 rounded-md bg-error-color/10 p-3 text-error-color">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-text-color">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field mt-1 w-full"
              placeholder="johndoe"
            />
          </div>

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

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-text-color">
              Confirm Password
            </label>
            <div className="relative mt-1">
              <input
                id="confirm-password"
                type={showPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="input-field w-full pr-10"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="terms"
              type="checkbox"
              required
              className="h-4 w-4 rounded border-input-border-color bg-input-bg-color text-button-active focus:ring-button-active"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-text-color">
              I agree to the{" "}
              <Link href="/terms" className="text-button-active hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy" className="text-button-active hover:underline">
                Privacy Policy
              </Link>
            </label>
          </div>

          <button type="submit" disabled={isLoading} className="btn-primary w-full">
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <span className="text-text-color">Already have an account?</span>{" "}
          <Link href="/login" className="text-button-active hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  )
}

