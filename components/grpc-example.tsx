"use client"

import { useState } from "react"
import { createAuthClient } from "@/lib/grpc-client"

export function GrpcExample() {
  const [result, setResult] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    setLoading(true)
    try {
      const authClient = createAuthClient()

      // In a real app with generated code, you would do something like:
      // const request = new LoginRequest()
      // request.setEmail('test@example.com')
      // request.setPassword('password')

      // For our mock:
      const response = await authClient.login({
        getEmail: () => "test@example.com",
        getPassword: () => "password",
      })

      setResult(`Login successful! Token: ${response.getToken()}`)
    } catch (error) {
      setResult(`Error: ${error instanceof Error ? error.message : String(error)}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-lg border border-border-color bg-card-bg-color p-6">
      <h2 className="mb-4 text-lg font-medium text-white">gRPC Test</h2>
      <button onClick={handleClick} disabled={loading} className="btn-primary">
        {loading ? "Testing..." : "Test gRPC Connection"}
      </button>
      {result && (
        <div className="mt-4 rounded-md bg-bg-color p-4">
          <pre className="text-sm text-text-color">{result}</pre>
        </div>
      )}
    </div>
  )
}

