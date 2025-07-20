import AppShell from "@/app/(site)/app-shell"
import InsuranceTrackingPage from "@/components/trackOrders/InsuranceTrackingPage";
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <AppShell>
        <InsuranceTrackingPage/>
    </AppShell>
  )
}
