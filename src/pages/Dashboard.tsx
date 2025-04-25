import { useEffect, useState } from "react"
import { Activity, Award, CheckCheck, CalendarDays, Flame } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import StatsCard from "@/components/dashboard/StatsCard"
import Calendar from "@/components/dashboard/Calendar"
import HabitCard from "@/components/habits/HabitCard"
import { useIsMobile } from "@/hooks/use-mobile"
import { useHabitStats } from "@/hooks/use-habit-stats"
import { useHabitCompletion } from "@/hooks/use-habit-completion"
import mockData from "@/mock-data"

function Dashboard() {
  const [habits] = useState(mockData.habits)
  const isMobile = useIsMobile()
  const { completions, handleCompleteHabit } = useHabitCompletion(
    mockData.completions
  )
  const { completedHabits, habitStreaks, todayProgress } = useHabitStats(
    habits,
    completions
  )

  useEffect(() => {
    const settings = localStorage.getItem("user-settings")
    if (settings) {
      const { theme } = JSON.parse(settings)
      document.documentElement.classList.toggle("dark", theme === "dark")
    }
  }, [])

  // Calcular estatísticas
  const activeHabits = habits.filter((h) => !h.isArchived)
  const topHabits = habits
    .filter((h) => !h.isArchived)
    .sort((a, b) => (habitStreaks[b.id] || 0) - (habitStreaks[a.id] || 0))
    .slice(0, 3)

  const maxStreak = Math.max(...Object.values(habitStreaks), 0)

  return (
    <ScrollArea className="h-[calc(100vh-4rem)]">
      <div className="container py-4 md:py-6 space-y-4 md:space-y-8 px-4 md:px-6">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          <StatsCard
            title="Total de Hábitos"
            value={activeHabits.length}
            icon={<Activity className="h-4 md:h-5 w-4 md:w-5" />}
          />
          <StatsCard
            title="Concluídos"
            value={todayProgress.completed}
            description={
              isMobile ? undefined : `de ${activeHabits.length} hábitos`
            }
            icon={<CheckCheck className="h-4 md:h-5 w-4 md:w-5" />}
          />
          <StatsCard
            title="Maior Sequência"
            value={maxStreak}
            description={isMobile ? undefined : "dias consecutivos"}
            icon={<Flame className="h-4 md:h-5 w-4 md:w-5" />}
          />
          <StatsCard
            title="Próxima Meta"
            value={`${maxStreak + 5} dias`}
            description={isMobile ? undefined : "Consistência"}
            icon={<Award className="h-4 md:h-5 w-4 md:w-5" />}
          />
        </div>

        {!isMobile && (
          <div>
            <h2 className="text-xl font-bold mb-4">Suas Melhores Sequências</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {topHabits.map((habit, index) => (
                <div
                  key={habit.id}
                  className="flex items-center p-4 bg-card border rounded-lg"
                >
                  <div className="flex items-center justify-center h-8 w-8 md:h-10 md:w-10 rounded-full bg-primary/10 text-primary mr-4">
                    {index === 0 ? (
                      <Flame className="h-4 w-4 md:h-5 md:w-5" />
                    ) : (
                      <span className="font-bold">{index + 1}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm md:text-base">
                      {habit.name}
                    </h3>
                    <p className="text-xs md:text-sm text-muted-foreground flex items-center">
                      <Flame className="h-3 w-3 md:h-4 md:w-4 mr-1 text-habit-warning" />
                      {habitStreaks[habit.id] || 0} dias consecutivos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {/*  {!isMobile && <Calendar habits={habits} completions={completions} />} */}

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg md:text-xl font-bold">
                Hábitos para Hoje
              </h2>
              <Button
                variant="outline"
                size={isMobile ? "sm" : "default"}
                className="flex items-center gap-1"
              >
                <CalendarDays className="h-4 w-4" />
                {!isMobile && <span>Visualizar Todos</span>}
              </Button>
            </div>

            <div className="space-y-3">
              {habits.length === 0 ? (
                <div className="flex flex-col items-center justify-center p-4 md:p-6 border border-dashed rounded-lg">
                  <p className="text-sm md:text-base text-muted-foreground">
                    Nenhum hábito para acompanhar ainda.
                  </p>
                  <Button
                    variant="link"
                    size={isMobile ? "sm" : "default"}
                    className="mt-2"
                  >
                    Adicionar seu primeiro hábito
                  </Button>
                </div>
              ) : (
                activeHabits
                  .slice(0, isMobile ? 4 : 3)
                  .map((habit) => (
                    <HabitCard
                      key={habit.id}
                      habit={habit}
                      onComplete={handleCompleteHabit}
                      onDelete={() => {}}
                      onEdit={() => {}}
                      streak={habitStreaks[habit.id] || 0}
                      completedToday={completedHabits[habit.id] || false}
                    />
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </ScrollArea>
  )
}

export default Dashboard
