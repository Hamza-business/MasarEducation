import AppShell from "@/app/(site)/app-shell"
import { Container } from "@/app/(site)/container";
import { Skeleton } from "@/components/ui/skeleton"
import {useTranslations} from 'next-intl';
import HeroHome from "../../components/landing/hero-home";
import Cta from "../../components/landing/cta";
import Features from "../../components/landing/features";
import Workflows from "../../components/landing/workflows";
import Footer from "@/components/static/footer";
import { Separator } from '@/components/ui/separator';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <AppShell>
      <HeroHome/>
      <Workflows/>
      <div style={{width: "70%", minWidth: "270px"}} className="mx-auto">
        <Separator />
      </div>
      <Features/>
      {/* <Cta/> */}
      <Footer/>
    </AppShell>
  )
}

// #103c5c
// #e85f5e
// #e9e9e9