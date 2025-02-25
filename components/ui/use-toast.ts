import { useEffect, useState } from "react"

type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

// Simple toast implementation for the example
// In a real app, this would use a context provider
export const toast = (props: ToastProps) => {
  console.log(`Toast: ${props.title} - ${props.description}`)
}

export const useToast = () => {
  const [toasts, setToasts] = useState<any[]>([])
  
  return {
    toasts,
    toast: (props: ToastProps) => {
      const id = Math.random().toString(36).substring(2, 9)
      setToasts((prev) => [...prev, { id, ...props }])
    },
    dismiss: (id: string) => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }
  }
}
