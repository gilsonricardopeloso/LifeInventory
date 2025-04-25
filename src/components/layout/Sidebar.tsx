import { NavLink } from "react-router-dom"
import {
  Activity,
  Calendar,
  BarChart3,
  Home,
  PlusCircle,
  Settings,
  Award,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/LanguageContext"

function AppSidebar() {
  const { toast } = useToast()
  const { t } = useLanguage()

  const handleNewHabitClick = () => {
    toast({
      title: t("newHabit", "menu"),
      description:
        "Função de adicionar hábito será implementada na próxima etapa!",
    })
  }

  return (
    <Sidebar>
      <SidebarHeader className="flex justify-center items-center p-4">
        <div className="flex items-center gap-2">
          <Activity className="h-6 w-6 text-primary" />
          <h1 className="text-lg font-bold">Life Inventory</h1>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{t("main", "menu")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 text-primary font-medium"
                        : "flex items-center gap-3"
                    }
                  >
                    <Home className="h-5 w-5" />
                    <span>Dashboard</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/habits"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 text-primary font-medium"
                        : "flex items-center gap-3"
                    }
                  >
                    <Activity className="h-5 w-5" />
                    <span>{t("habits", "menu")}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/calendar"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 text-primary font-medium"
                        : "flex items-center gap-3"
                    }
                  >
                    <Calendar className="h-5 w-5" />
                    <span>{t("calendar", "menu")}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/statistics"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 text-primary font-medium"
                        : "flex items-center gap-3"
                    }
                  >
                    <BarChart3 className="h-5 w-5" />
                    <span>{t("statistics", "menu")}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>{t("configuration", "menu")}</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/achievements"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 text-primary font-medium"
                        : "flex items-center gap-3"
                    }
                  >
                    <Award className="h-5 w-5" />
                    <span>{t("achievements", "menu")}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                      isActive
                        ? "flex items-center gap-3 text-primary font-medium"
                        : "flex items-center gap-3"
                    }
                  >
                    <Settings className="h-5 w-5" />
                    <span>{t("settings", "menu")}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button
          className="w-full flex items-center gap-2"
          onClick={handleNewHabitClick}
        >
          <PlusCircle className="h-4 w-4" />
          <span>{t("newHabit", "menu")}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
