// This is a basic setup for gRPC-web
// In a real application, you would generate TypeScript definitions from your .proto files

// Base URL for your gRPC-web proxy (typically Envoy)
const GRPC_HOST = process.env.NEXT_PUBLIC_GRPC_HOST || "http://localhost:8080"

// Create a generic client
export function createGrpcClient<T>(ServiceClient: any): T {
  return new ServiceClient(GRPC_HOST, null, {
    "Content-Type": "application/grpc-web+proto",
  })
}

// Example of how to use the client with a generated service
// In a real app, you would import generated clients from your proto files
export function createAuthClient() {
  // This is a placeholder - in a real app, you would import the generated client
  // const AuthClient = require('./generated/auth_grpc_web_pb').AuthClient
  // return createGrpcClient<any>(AuthClient)

  // For now, we'll return a mock client
  return {
    login: async (request: any) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock response
      return {
        getToken: () => "mock-token",
        getUserId: () => "1",
        getUsername: () => "testuser",
      }
    },
    register: async (request: any) => {
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Mock response
      return {
        getToken: () => "mock-token",
        getUserId: () => "1",
        getUsername: () => request.getUsername(),
      }
    },
  }
}

