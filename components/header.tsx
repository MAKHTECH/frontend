"use client"

import { useState } from "react"
import Link from "next/link"
import { useAuth } from "@/app/providers"
import { User, LogOut, Settings, Bell, Search } from "lucide-react"

export function Header() {
  const { user, logout } = useAuth()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  return (
    <header className="fixed top-0 right-0 z-40 flex h-16 w-[calc(100%-16rem)] items-center justify-between border-b border-border-color bg-bg-color px-6">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-color opacity-50" />
          <input
            type="text"
            placeholder="Search..."
            className="input-field pl-10 w-64 rounded-full bg-input-bg-color/50 focus:bg-input-bg-color"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="rounded-full p-2 hover:bg-hover-color transition-colors">
          <Bell className="h-5 w-5" />
        </button>

        <div className="relative">
          <button
            className="flex items-center gap-2 rounded-full p-1 hover:bg-hover-color transition-colors"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-color text-white">
              {user?.username.charAt(0).toUpperCase() || <User className="h-5 w-5" />}
            </div>
            <span className="text-username-color">{user?.username || "Guest"}</span>
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md bg-dropdown-bg-color shadow-lg ring-1 ring-black ring-opacity-5 py-1">
              <Link
                href="/profile"
                className="block px-4 py-2 text-sm hover:bg-hover-color transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </div>
              </Link>
              <Link
                href="/settings"
                className="block px-4 py-2 text-sm hover:bg-hover-color transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                <div className="flex items-center gap-2">
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </div>
              </Link>
              <button
                className="block w-full px-4 py-2 text-left text-sm text-error-color hover:bg-hover-color transition-colors"
                onClick={() => {
                  logout()
                  setIsDropdownOpen(false)
                }}
              >
                <div className="flex items-center gap-2">
                  <LogOut className="h-4 w-4" />
                  <span>Sign out</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

