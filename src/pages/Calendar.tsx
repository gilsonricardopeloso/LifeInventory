import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useHabitCompletion } from "@/hooks/use-habit-completion"
import { useQuery } from "@tanstack/react-query"
import { getHabits } from "@/services/habits"
import { Habit } from "@/types/habit"
import { useLanguage } from "@/contexts/LanguageContext"
import { useState } from "react"

const CalendarPage = () => {
  const [date, setDate] = useState<Date>(new Date())
  const { t } = useLanguage()
  const { data: habits = [] } = useQuery<Habit[]>({
    queryKey: ["habits"],
    queryFn: getHabits,
  })

  const { completions } = useHabitCompletion()

  // Function to check if a date has completions
  const getDayHasCompletions = (day: Date) => {
    const dateStr = format(day, "yyyy-MM-dd")
    const dayCompletions = completions.filter(
      (c) => format(new Date(c.date), "yyyy-MM-dd") === dateStr
    )
    const totalHabits = habits.filter((h) => !h.isArchived).length

    if (dayCompletions.length === 0) return undefined
    if (dayCompletions.length === totalHabits) return "completed"
    return "partial"
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle>{t("title", "calendar")}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => newDate && setDate(newDate)}
              className="rounded-md border p-3"
              modifiers={{
                completed: (date) => getDayHasCompletions(date) === "completed",
                partial: (date) => getDayHasCompletions(date) === "partial",
              }}
              modifiersClassNames={{
                completed:
                  "bg-habit-success text-white hover:bg-habit-success hover:text-white",
                partial:
                  "bg-habit-warning text-white hover:bg-habit-warning hover:text-white",
              }}
            />
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-habit-success" />
              <span className="text-sm text-muted-foreground">
                {t("allHabits", "calendar")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-habit-warning" />
              <span className="text-sm text-muted-foreground">
                {t("someHabits", "calendar")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default CalendarPage
