import { ClerkProvider } from '@clerk/nextjs/app-beta'
import { Inter } from 'next/font/google'

import { Header } from '@/components/header'

import type { Metadata } from 'next'

import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Emotier',
    description: 'Like a twitter, but emoji 🙃',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: 'any' },
            { url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
            { url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
        ],
        apple: '/apple-touch-icon.png',
    },
}

export default function RootLayout ({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <ClerkProvider>
                <body className={inter.className}>
                    <Header/>
                    {children}
                </body>
            </ClerkProvider>
        </html>
    )
}
