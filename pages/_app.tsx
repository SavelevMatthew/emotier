import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'

import { trpc } from '@/client/trpc'

import type { AppType } from 'next/app'

const App: AppType = ({ Component, pageProps }) => {
    return (
        <ClerkProvider {...pageProps}>
            <Component {...pageProps}/>
        </ClerkProvider>
    )
}

export default trpc.withTRPC(App)