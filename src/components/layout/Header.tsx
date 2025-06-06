import React from "react"
import { Menu, Moon, Sun, Globe } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { useLanguage } from "@/contexts/LanguageContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getCurrentUser } from "@/mock-data/users"
import NotificationPopover from "./NotificationPopover"
import { useThemeSettings } from "@/hooks/useThemeSettings"

interface HeaderProps {
  toggleTheme: () => void
  theme: "light" | "dark"
  onLogout: () => void
}

function Header({
  toggleTheme: _toggleTheme,
  theme: _theme,
  onLogout,
}: HeaderProps) {
  const { language } = useLanguage()
  const currentUser = getCurrentUser()
  const { theme, toggleTheme } = useThemeSettings()
  const location = useLocation()
  const isSettingsPage = location.pathname === "/settings"

  const getLanguageDisplay = () => {
    return language === "pt-BR" ? "PT" : "EN"
  }

  const getUserInitials = () => {
    return currentUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <header className="fixed top-0 left-0 w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 z-30">
      <div className="flex items-center gap-2">
        <SidebarTrigger>
          <Menu className="h-5 w-5" />
        </SidebarTrigger>
        <h1 className="text-xl font-bold text-primary ml-2">Life Inventory</h1>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex items-center bg-muted/60 px-2 py-1 rounded text-xs mr-2">
          <Globe className="h-3 w-3 mr-1" />
          <span>{getLanguageDisplay()}</span>
        </div>

        <NotificationPopover />

        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          disabled={isSettingsPage}
        >
          {theme === "light" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative h-8 w-8 rounded-full"
            >
              <Avatar className="h-8 w-8">
                <AvatarFallback className="bg-primary/10">
                  {getUserInitials()}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/profile" className="w-full">
                Perfil
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/settings" className="w-full">
                Configurações
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Ajuda</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onLogout}>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
