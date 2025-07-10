import AppShell from "@/components/app-shell"
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
