import React, { useState, useEffect } from "react"
import { mockAuth } from "@/services/mockAuth"
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  Outlet,
} from "react-router-dom"
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

const ProtectedLayout = (props: {
  toggleTheme: () => void
  theme: "light" | "dark"
  onLogout: () => void
}) => (
  <SidebarProvider>
    <div className="min-h-screen flex flex-col w-full">
      <Header
        toggleTheme={props.toggleTheme}
        theme={props.theme}
        onLogout={props.onLogout}
      />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  </SidebarProvider>
)

const AppRoutes = () => {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => !!mockAuth.getCurrentUser()
  )

  // Inicializa autenticação apenas no mount
  useEffect(() => {
    const user = mockAuth.getCurrentUser()
    setIsAuthenticated(!!user)

    // Preferência de tema
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
    setTheme(prefersDark ? "dark" : "light")
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

  return (
    <LanguageProvider>
      <TooltipProvider>
        <Routes>
          {/* Landing sempre em / */}
          <Route
            path="/"
            element={<Landing onLogin={() => setIsAuthenticated(true)} />}
          />

          {/* Rotas protegidas */}
          {isAuthenticated && (
            <Route
              element={
                <ProtectedLayout
                  toggleTheme={toggleTheme}
                  theme={theme}
                  onLogout={handleLogout}
                />
              }
            >
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="habits" element={<Habits />} />
              <Route path="calendar" element={<CalendarPage />} />
              <Route path="profile" element={<Profile />} />
              <Route path="statistics" element={<Statistics />} />
              <Route path="achievements" element={<Achievements />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          )}

          {/* Se não autenticado e tentar acessar rota protegida, redireciona para / */}
          {!isAuthenticated && (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
        <Toaster />
        <Sonner />
      </TooltipProvider>
    </LanguageProvider>
  )
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </QueryClientProvider>
)

export default App
