import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { Award } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"

// Mock achievements
const achievements = [
  {
    id: 1,
    titleKey: "firstHabit",
    descriptionKey: "firstHabitDesc",
    icon: Award,
    unlocked: true,
  },
  {
    id: 2,
    titleKey: "fullWeek",
    descriptionKey: "fullWeekDesc",
    icon: Award,
    unlocked: false,
  },
  {
    id: 3,
    titleKey: "routineBuilder",
    descriptionKey: "routineBuilderDesc",
    icon: Award,
    unlocked: false,
  },
]

export default function Achievements() {
  const { t } = useLanguage()

  return (
    <div className="container py-8 space-y-6">
      <h1 className="text-2xl font-bold mb-4">{t("achievements", "menu")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {achievements.map((ach) => (
          <Card
            key={ach.id}
            className={`transition-all ${
              ach.unlocked
                ? "border-primary bg-white/90 dark:bg-card"
                : "opacity-60 grayscale"
            }`}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-lg">
                <ach.icon
                  className={`h-7 w-7 ${
                    ach.unlocked ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                {t(ach.titleKey, "achievements")}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                {t(ach.descriptionKey, "achievements")}
              </p>
              <div className="mt-2">
                {ach.unlocked ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                    {t("unlocked", "achievements")}
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded">
                    {t("locked", "achievements")}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
