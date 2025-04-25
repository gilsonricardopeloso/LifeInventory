import { useState, useEffect, useCallback } from "react"

export function useThemeSettings() {
  // Inicializa o tema a partir do localStorage ou do DOM
  const getInitialTheme = () => {
    const settings = localStorage.getItem("user-settings")
    if (settings) {
      return JSON.parse(settings).theme
    }
    return document.documentElement.classList.contains("dark")
      ? "dark"
      : "light"
  }

  const [theme, setTheme] = useState<string>(getInitialTheme)

  // Aplica o tema no DOM e salva no localStorage sempre que mudar
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    // Atualiza o localStorage mantendo outras configs
    const settings = localStorage.getItem("user-settings")
    const parsed = settings ? JSON.parse(settings) : {}
    parsed.theme = theme
    localStorage.setItem("user-settings", JSON.stringify(parsed))
  }, [theme])

  // Função para alternar o tema
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"))
  }, [])

  return { theme, setTheme, toggleTheme }
}
