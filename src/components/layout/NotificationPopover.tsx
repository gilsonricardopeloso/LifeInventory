import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useLanguage } from "@/contexts/LanguageContext"

const mockNotifications = [
  {
    id: 1,
    title: "Nova Conquista Desbloqueada!",
    description: "Parabéns! Você completou 7 dias consecutivos de hábitos.",
    time: "há 2 horas",
    read: false,
  },
  {
    id: 2,
    title: "Lembrete de Hábito",
    description: "Não se esqueça de registrar seus hábitos de hoje!",
    time: "há 5 horas",
    read: false,
  },
  {
    id: 3,
    title: "Mês Concluído",
    description:
      "Você completou 80% dos seus hábitos este mês. Continue assim!",
    time: "há 1 dia",
    read: true,
  },
  {
    id: 4,
    title: "Novo Recorde",
    description: "Você bateu seu recorde pessoal de sequência!",
    time: "há 2 dias",
    read: true,
  },
]

const NotificationPopover = () => {
  const { t } = useLanguage()
  const unreadCount = mockNotifications.filter((n) => !n.read).length

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <div className="absolute top-1 right-1 h-2 w-2 rounded-full bg-habit-warning" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-80">
        <div className="flex items-center justify-between mb-2">
          <h4 className="font-semibold">Notificações</h4>
          {unreadCount > 0 && (
            <span className="text-xs text-muted-foreground">
              {unreadCount} não lida{unreadCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <ScrollArea className="h-[300px] pr-4">
          <div className="space-y-3">
            {mockNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 rounded-lg border ${
                  !notification.read ? "bg-muted/50" : ""
                }`}
              >
                <div className="font-medium text-sm">{notification.title}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {notification.description}
                </p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {notification.time}
                </span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  )
}

export default NotificationPopover
