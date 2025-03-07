/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        "bg-color": "var(--bg-color)",
        "button-active": "var(--button-active)",
        "text-color": "var(--text-color)",
        "bg-main-color": "var(--bg-main-color)",
        "username-color": "var(--username-color)",
        "menu-button-color": "var(--menu-button-color)",
        "menu-button-active": "var(--menu-button-active)",
        "green-color": "var(--green-color)",
        "error-color": "var(--error-color)",
        "warning-color": "var(--warning-color)",
        "success-color": "var(--success-color)",
        "info-color": "var(--info-color)",
        "border-color": "var(--border-color)",
        "card-bg-color": "var(--card-bg-color)",
        "hover-color": "var(--hover-color)",
        "disabled-color": "var(--disabled-color)",
        "input-bg-color": "var(--input-bg-color)",
        "input-border-color": "var(--input-border-color)",
        "dropdown-bg-color": "var(--dropdown-bg-color)",
        "sidebar-bg-color": "var(--sidebar-bg-color)",
        "sidebar-hover-color": "var(--sidebar-hover-color)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

