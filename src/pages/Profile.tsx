import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Bell, Mail, Shield, User } from "lucide-react"
import { getCurrentUser } from "@/mock-data/users"
import { Switch } from "@/components/ui/switch"
import StatsSection from "@/components/profile/StatsSection"

const Profile = () => {
  const user = getCurrentUser()

  return (
    <div className="container py-8 space-y-6">
      {/* Profile Card */}
      <Card>
        <CardHeader>
          <CardTitle>Meu Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={user.avatar} />
              <AvatarFallback>
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-medium">{user.name}</h3>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Shield className="h-4 w-4" />
                <span>
                  {user.role === "admin" ? "Administrador" : "Usuário"}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Card */}
      <Card>
        <CardHeader>
          <CardTitle>Configurações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Notificações</h4>
              <p className="text-sm text-muted-foreground">
                Receber notificações sobre seus hábitos
              </p>
            </div>
            <Switch checked={user.preferences.notifications} />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Tema</h4>
              <p className="text-sm text-muted-foreground">
                {user.preferences.theme === "light"
                  ? "Tema Claro"
                  : "Tema Escuro"}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h4 className="font-medium">Idioma</h4>
              <p className="text-sm text-muted-foreground">
                {user.preferences.language === "pt-BR"
                  ? "Português (Brasil)"
                  : "English"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      <StatsSection userId={user.id} />
    </div>
  )
}

export default Profile
