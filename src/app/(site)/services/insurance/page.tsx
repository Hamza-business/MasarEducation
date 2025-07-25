import AppShell from "@/app/(site)/app-shell"
import InsuranceOrderingPage from "@/components/insuranceOrder/InsuranceOrderingManager";
import {useTranslations} from 'next-intl';

export default function Home() {
  const t = useTranslations('HomePage');
  return (
    <AppShell>
      <InsuranceOrderingPage/>
    </AppShell>
  )
}
