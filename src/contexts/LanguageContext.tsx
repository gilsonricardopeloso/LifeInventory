import { createContext, useContext, useState, useEffect } from "react"

type LanguageContextType = {
  language: string
  setLanguage: (lang: string) => void
  t: (key: string, section?: string) => string
  translations: Record<string, any> | null
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or use default
    return localStorage.getItem("app-language") || "pt-BR"
  })
  const [translations, setTranslations] = useState<Record<string, any> | null>(
    null
  )
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load translations for the current language
    fetch(`/translations/${language}.json`)
      .then((response) => response.json())
      .then((data) => {
        setTranslations(data)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error loading translations:", error)
        setIsLoading(false)
      })
  }, [language])

  useEffect(() => {
    // Save the selected language to localStorage
    localStorage.setItem("app-language", language)
  }, [language])

  // Function to get translation by key with nested path support
  const t = (key: string, section?: string): string => {
    if (!translations || isLoading) return key
    try {
      const parts = key.split(".")
      let result: any = translations

      // If section is provided, use it as the starting point
      if (section) {
        result = result[section]
      }

      // Navigate through the object using the parts
      for (const part of parts) {
        if (result && part in result) {
          result = result[part]
        } else {
          // If the key doesn't exist, return the key itself
          return key
        }
      }

      // Make sure the result is a string
      return typeof result === "string" ? result : key
    } catch (error) {
      console.error(`Translation error for key: ${key}`, error)
      return key
    }
  }

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, translations, isLoading }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
