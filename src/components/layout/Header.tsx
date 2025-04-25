import { Bell, Menu, Moon, Settings, Sun, User, Globe } from "lucide-react"
import { Link } from "react-router-dom"
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
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/LanguageContext"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { getCurrentUser } from "@/mock-data/users"
import NotificationPopover from "./NotificationPopover"

interface HeaderProps {
  toggleTheme: () => void
  theme: "light" | "dark"
  onLogout: () => void
}

function Header({ toggleTheme, theme, onLogout }: HeaderProps) {
  const { toast } = useToast()
  const { language } = useLanguage()
  const currentUser = getCurrentUser()

  const getUserInitials = () => {
    return currentUser.name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }
  const handleNotificationClick = () => {
    toast({
      title: "Notificações",
      description: "Função de notificações será implementada em breve!",
    })
  }

  const handleUserClick = () => {
    toast({
      title: "Perfil do Usuário",
      description: "Funcionalidade de perfil será implementada em breve!",
    })
  }

  const getLanguageDisplay = () => {
    return language === "pt-BR" ? "PT" : "EN"
  }

  return (
    <header className="w-full h-16 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex items-center justify-between px-4 z-10">
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

        <Button variant="ghost" size="icon" onClick={handleUserClick}>
          <User className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={handleNotificationClick}>
          <Bell className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
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
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configurações</DropdownMenuItem>
            <DropdownMenuItem>Ajuda</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Sair</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default Header
