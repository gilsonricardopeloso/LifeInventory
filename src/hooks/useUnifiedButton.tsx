import { Button, ButtonProps } from "@/components/ui/button"
import { useCallback } from "react"

export function useUnifiedButton() {
  // Aqui você pode adicionar lógica customizada compartilhada, se necessário
  // Exemplo: analytics, loading global, etc.
  const UnifiedButton = useCallback(
    (props: ButtonProps) => <Button {...props} />,
    []
  )
  return { UnifiedButton }
}
