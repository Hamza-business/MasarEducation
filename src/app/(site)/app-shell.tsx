import { ModeToggle } from "@/components/mode-toggle"
import { Container } from "@/app/(site)/container"
import LanguageSwitcher from '@/components/LanguageSwitcher';

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="p-4 border-b">
        <Container className="flex justify-between items-center">
          <h1 className="text-xl font-bold">MyApp</h1>
          <LanguageSwitcher type={"list"}/>
          <ModeToggle type={"smbutton"}/>
        </Container>
      </header>

      {/* <main className="flex-1"> */}
          {children}
      {/* </main> */}
      
      <footer className="border-t py-6 mt-12 bg-muted/10 text-center text-sm text-muted-foreground">
        <Container>© 2025 CompeteX. All rights reserved.</Container>
      </footer>
    </div>
  )
}
