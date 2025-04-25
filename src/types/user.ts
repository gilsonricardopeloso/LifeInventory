export type UserRole = "admin" | "user"

export interface User {
  id: string
  name: string
  email: string
  role: UserRole
  avatar?: string
  createdAt: Date
  preferences: {
    notifications: boolean
    theme: "light" | "dark"
    language: "pt-BR" | "en"
  }
}
