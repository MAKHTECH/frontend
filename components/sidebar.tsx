"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Users, Settings, BarChart2, Shield, Key, HelpCircle, LogOut } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "Users", href: "/users", icon: Users },
    { name: "Authentication", href: "/authentication", icon: Key },
    { name: "Analytics", href: "/analytics", icon: BarChart2 },
    { name: "Security", href: "/security", icon: Shield },
    { name: "Settings", href: "/settings", icon: Settings },
  ]

  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-sidebar-bg-color border-r border-border-color flex flex-col">
      <div className="flex h-16 items-center border-b border-border-color px-6">
        <h1 className="text-xl font-bold text-username-color">SSO Service</h1>
      </div>
      <div className="flex-grow overflow-y-auto py-4">
        <nav className="space-y-1 px-3">
          {navigation.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-hover-color hover:text-white ${
                  isActive ? "bg-button-active text-white" : "text-text-color"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="border-t border-border-color p-4">
        <Link
          href="/help"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-hover-color hover:text-white text-text-color"
        >
          <HelpCircle className="h-5 w-5" />
          <span>Help & Support</span>
        </Link>
        <button className="flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors hover:bg-sidebar-hover-color hover:text-white text-error-color w-full mt-2">
          <LogOut className="h-5 w-5" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  )
}

