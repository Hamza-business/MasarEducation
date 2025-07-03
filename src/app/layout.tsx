// src/app/layout.tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Providers } from '../components/providers'
import {NextIntlClientProvider} from 'next-intl';
import {getLocale} from 'next-intl/server';
// import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Your App',
  description: 'Welcome!',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const locale = (await cookieStore).get('locale')?.value || 'en';
  const dir = ['ar'].includes(locale) ? 'rtl' : 'ltr';

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={inter.className} key={dir}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            <NextIntlClientProvider locale={locale}>
              {children}
            </NextIntlClientProvider>
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
