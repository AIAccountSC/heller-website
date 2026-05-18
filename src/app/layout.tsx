import type { Metadata } from 'next'
import { Providers } from '@/components/Providers'
import './heller.css'

export const metadata: Metadata = {
  title: 'Heller — Premium-Websites für lokale Dienstleister',
  description: 'Wir verwandeln veraltete Websites in moderne, hochwertige Webauftritte. Für Handwerksbetriebe, Praxen, Studios und Kanzleien in Deutschland.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="light">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
