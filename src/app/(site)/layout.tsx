// src/app/layout.tsx
import '../globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { Providers } from '../../components/providers'
import {NextIntlClientProvider} from 'next-intl';
import { cookies } from 'next/headers';
import { Toaster } from "@/components/ui/sonner"; 
import { Cairo, Ubuntu } from 'next/font/google';

export const cairo = Cairo({
  subsets: ['arabic'],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900", "1000"],
  variable: '--font-arabic',
});

export const ubuntu = Ubuntu({
  subsets: ['cyrillic'],
  weight: ["300", "400", "500", "700"],
  variable: '--font-arabic',
});



export const metadata = {
  title: 'Masar',
  description: 'Welcome!',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = cookies();
  const locale = (await cookieStore).get('locale')?.value || 'en';
  const dir = ['ar'].includes(locale) ? 'rtl' : 'ltr';
  const font = locale === 'ar' ? cairo : ubuntu;

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={`${font.className} bg-[#fcfcfc]`} key={dir}>
        <NextIntlClientProvider locale={locale}>
            {children}
            <Toaster />
        </NextIntlClientProvider>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider> */}
      </body>
    </html>
  )
}
