import AppShell from "@/components/app-shell"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <AppShell>
      <h2 className="text-3xl font-bold mb-4">Welcome to Your App</h2>
      <p>This is a test page to verify everything works!</p>
      <Skeleton className="h-6 w-40" />
    </AppShell>
  )
}
