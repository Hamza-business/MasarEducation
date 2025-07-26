import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import { Providers } from '../../components/providers'
import {NextIntlClientProvider} from 'next-intl';
import { cookies } from 'next/headers';
import AppLoad from './appLoad';
import { Toaster } from "@/components/ui/sonner"; 
import React from 'react';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Masar',
  description: 'Welcome!',
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  // const locale = (await cookieStore).get('locale')?.value || 'en';
  // const dir = ['ar'].includes(locale) ? 'rtl' : 'ltr';
  const defaultOpen = (await cookieStore).get("sidebar_state")?.value === "true";

  return (
    <html lang={"en"} dir={"ltr"} suppressHydrationWarning>
      <body className={inter.className} key={"ltr"}>
          <ThemeProvider attribute="class" defaultTheme="system">
            <Providers>
              <NextIntlClientProvider locale={"en"}>
                  <AppLoad defaultOpen={defaultOpen}>
                      {children}
                  </AppLoad>
                  <Toaster />
              </NextIntlClientProvider>
            </Providers>
          </ThemeProvider>
      </body>
    </html>
  );
}
