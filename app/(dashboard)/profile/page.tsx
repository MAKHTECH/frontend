"use client"

import { useState } from "react"
import { useAuth } from "@/app/providers"
import { User, Mail, Key, Shield } from "lucide-react"

export default function ProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">User Profile</h1>

      <div className="card p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-20 w-20 rounded-full bg-accent-color flex items-center justify-center text-white text-3xl font-bold">
            {user?.username.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{user?.username}</h2>
            <p className="text-text-color">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <User className="h-5 w-5 text-accent-color" />
            <span className="text-white">Username:</span>
            {isEditing ? (
              <input className="input-field ml-2" defaultValue={user?.username} />
            ) : (
              <span className="text-text-color">{user?.username}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-accent-color" />
            <span className="text-white">Email:</span>
            {isEditing ? (
              <input className="input-field ml-2" defaultValue={user?.email} />
            ) : (
              <span className="text-text-color">{user?.email}</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Key className="h-5 w-5 text-accent-color" />
            <span className="text-white">Password:</span>
            {isEditing ? (
              <input className="input-field ml-2" type="password" placeholder="New password" />
            ) : (
              <span className="text-text-color">••••••••</span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Shield className="h-5 w-5 text-accent-color" />
            <span className="text-white">Two-factor authentication:</span>
            <span className="text-text-color">Enabled</span>
          </div>
        </div>

        <div className="mt-6">
          {isEditing ? (
            <div className="space-x-2">
              <button className="btn-primary" onClick={() => setIsEditing(false)}>
                Save Changes
              </button>
              <button className="btn-secondary" onClick={() => setIsEditing(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn-primary" onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

