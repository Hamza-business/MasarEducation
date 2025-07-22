import { ModeToggle } from "@/components/mode-toggle"
import { Container } from "@/app/(site)/container"
import LanguageSwitcher from '@/components/LanguageSwitcher';
import Header from "../../components/static/navbar";
import Footer from "../../components/static/footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>

      {/* <main className="flex-1"> */}
        {children}
      {/* </main> */}
      
      
      <footer className="border-t py-6 bg-muted/10 text-center text-sm text-muted-foreground">
        <Container>© 2025 CompeteX. All rights reserved.</Container>
      </footer>
    </div>
  )
}
