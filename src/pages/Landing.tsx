import { LoginForm } from "@/components/auth/LoginForm"
import { useEffect } from "react"

interface LandingProps {
  onLogin?: () => void
}

const Landing = ({ onLogin }: LandingProps) => {
  useEffect(() => {
    const settings = localStorage.getItem("user-settings")
    if (settings) {
      const { theme } = JSON.parse(settings)
      console.log(theme)
      document.documentElement.classList.toggle("dark", theme === "dark")
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500/10 to-blue-500/10">
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between py-8">
          <h1 className="text-2xl font-bold text-primary">Life Inventory</h1>
        </nav>

        <div className="flex flex-col lg:flex-row items-center justify-between py-20 gap-12">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl lg:text-5xl font-bold">
              Transforme seus hábitos, <br />
              transforme sua vida
            </h2>
            <p className="text-xl text-muted-foreground">
              Acompanhe, gerencie e desenvolva hábitos positivos de forma
              simples e eficaz. Comece sua jornada de transformação hoje.
            </p>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full max-w-md p-8 rounded-xl bg-card shadow-lg border">
              <h3 className="text-2xl font-semibold mb-6 text-center">
                Acesse sua conta
              </h3>
              <LoginForm onLogin={onLogin} />
              <p className="text-sm text-center mt-4 text-muted-foreground">
                Use email: admin@habitflow.com <br />
                senha: 123456
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Landing
