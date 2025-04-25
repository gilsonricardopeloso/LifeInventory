import { useState, useEffect } from "react"
import { mockAuth } from "@/services/mockAuth"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LanguageProvider } from "@/contexts/LanguageContext"
import Header from "@/components/layout/Header"
import AppSidebar from "@/components/layout/Sidebar"
import Dashboard from "./pages/Dashboard"
import Habits from "./pages/Habits"
import NotFound from "./pages/NotFound"
import CalendarPage from "./pages/Calendar"
import Profile from "./pages/Profile"
import Statistics from "./pages/Statistics"
import Achievements from "./pages/Achievements"
import Settings from "./pages/Settings"
import Landing from "./pages/Landing"

const queryClient = new QueryClient()

const App = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const user = mockAuth.getCurrentUser()
    setIsAuthenticated(!!user)

    // Verificar preferência do sistema
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    setTheme(prefersDark ? "dark" : "light")

    // Aplicar tema
    document.documentElement.classList.toggle("dark", prefersDark)
  }, [])

  const toggleTheme = () => {
    setTheme((prev) => {
      const newTheme = prev === "light" ? "dark" : "light"
      document.documentElement.classList.toggle("dark", newTheme === "dark")
      return newTheme
    })
  }

  const handleLogout = () => {
    mockAuth.logout()
    setIsAuthenticated(false)
  }

  const renderAppContent = () => {
    return (
      <div>
        {isAuthenticated ? (
          <SidebarProvider>
            <div className="min-h-screen flex flex-col w-full">
              <Header
                toggleTheme={toggleTheme}
                theme={theme}
                onLogout={handleLogout}
              />
              <div className="flex flex-1 overflow-hidden">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/" element={<Navigate to="/dashboard" />} />
                    <Route path="/habits" element={<Habits />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/statistics" element={<Statistics />} />
                    <Route path="/achievements" element={<Achievements />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
            </div>
          </SidebarProvider>
        ) : (
          <Routes>
            <Route path="*" element={<Landing />} />
          </Routes>
        )}
      </div>
    )
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <LanguageProvider>
          <TooltipProvider>{renderAppContent()}</TooltipProvider>
          <Toaster />
          <Sonner />
        </LanguageProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
