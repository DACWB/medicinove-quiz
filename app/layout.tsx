import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Quiz SOAPIA - MediciNove',
  description: 'Questionário de onboarding da Mentoria MediciNove',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
