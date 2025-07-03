import { ModeToggle } from "./mode-toggle"
import { Container } from "@/components/container"

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="p-4 border-b">
        <Container className="flex justify-between items-center">
          <h1 className="text-xl font-bold">MyApp</h1>
          <ModeToggle />
        </Container>
      </header>

      <main className="flex-1">
        <Container className="py-10">
          {children}
        </Container>
      </main>
      
      <footer className="border-t py-6 mt-12 bg-muted/10 text-center text-sm text-muted-foreground">
        <Container>© 2025 CompeteX. All rights reserved.</Container>
      </footer>
    </div>
  )
}
