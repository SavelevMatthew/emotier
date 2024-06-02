import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import React from 'react'
import { Toaster } from 'react-hot-toast'

import { trpc } from '@/client/trpc'

import type { AppType } from 'next/app'

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
        loaded: (posthog) => {
            if (process.env.NODE_ENV === 'development') posthog.debug() // debug mode in development
        },
    })
}

const App: AppType = ({ Component, pageProps }) => {
    return (
        <ClerkProvider {...pageProps}>
            <PostHogProvider client={posthog}>
                <Toaster position='bottom-center'/>
                <Component {...pageProps}/>
            </PostHogProvider>
        </ClerkProvider>
    )
}

export default trpc.withTRPC(App)