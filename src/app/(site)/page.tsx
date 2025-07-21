import AppShell from "@/app/(site)/app-shell"
import { Container } from "@/app/(site)/container";
import { Skeleton } from "@/components/ui/skeleton"
import {useTranslations} from 'next-intl';
import HeroHome from "../../components/landing/hero-home";
import Cta from "../../components/landing/cta";
import Features from "../../components/landing/features";
import Workflows from "../../components/landing/workflows";
import Footer from "@/components/static/footer";

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <AppShell>
      <HeroHome/>
      <Workflows/>
      <Features/>
      <Cta/>
      <Footer/>
    </AppShell>
  )
}
