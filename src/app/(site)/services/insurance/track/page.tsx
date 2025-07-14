import AppShell from "@/app/(site)/app-shell"
import { Container } from "@/app/(site)/container";
import InsuranceTrackingPage from "@/components/trackOrders/InsuranceTrackingPage";
import { Skeleton } from "@/components/ui/skeleton"
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <AppShell>
        <InsuranceTrackingPage/>
    </AppShell>
  )
}
