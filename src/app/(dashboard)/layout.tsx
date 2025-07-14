import '../globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import { Inter } from 'next/font/google'
import { Providers } from '../../components/providers'
import {NextIntlClientProvider} from 'next-intl';
import { cookies } from 'next/headers';
import AppLoad from './appLoad';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your App1',
  description: 'Welcome!',
}

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const locale = (await cookieStore).get('locale')?.value || 'en';
  const dir = ['ar'].includes(locale) ? 'rtl' : 'ltr';
  const defaultOpen = (await cookieStore).get("sidebar_state")?.value === "true"

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={inter.className} key={dir}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <NextIntlClientProvider locale={locale}>
                <AppLoad defaultOpen={defaultOpen}>
                    {children}
                </AppLoad>
            </NextIntlClientProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
