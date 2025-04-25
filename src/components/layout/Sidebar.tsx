import { NavLink, useNavigate } from "react-router-dom"
import {
  Activity,
  Calendar,
  BarChart3,
  Home,
  PlusCircle,
  Settings,
  Award,
  UsersIcon,
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
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/LanguageContext"
import { useUnifiedButton } from "@/hooks/useUnifiedButton"
import { getCurrentUser } from "@/mock-data/users"

function AppSidebar() {
  const { toast } = useToast()
  const { t } = useLanguage()
  const { UnifiedButton } = useUnifiedButton()
  const navigate = useNavigate()
  const user = getCurrentUser()

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
                    to="/dashboard"
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

              {user.role === "admin" && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to="/users"
                      className={({ isActive }) =>
                        isActive
                          ? "flex items-center gap-3 text-primary font-medium"
                          : "flex items-center gap-3"
                      }
                    >
                      <UsersIcon className="h-5 w-5" />
                      <span>Usuários</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

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
        <UnifiedButton
          className="w-full flex items-center gap-2"
          onClick={() =>
            navigate("/habits", { state: { openAddDialog: true } })
          }
        >
          <PlusCircle className="h-4 w-4" />
          <span>{t("newHabit", "menu")}</span>
        </UnifiedButton>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
