import AppShell from "@/components/app-shell"
import { Container } from "@/components/container";
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
