'use client'

import AppShell from "@/components/app-shell";
import { Container } from "@/components/container";
import InsuranceManager from "@/components/insurance/InsuranceManager";

export default function InsurancePage() {
  return (
    <AppShell>
        <Container className="py-10">
            <InsuranceManager />
        </Container>
    </AppShell>
  );
}
