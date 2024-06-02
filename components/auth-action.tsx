'use client'
import { useAuth, SignInButton, SignOutButton } from '@clerk/nextjs'
import posthog from 'posthog-js'
import React, { useEffect } from 'react'

import { Button } from './button'

export const AuthAction: React.FC = () => {
    const { isLoaded, isSignedIn, userId } = useAuth()

    useEffect(() => {
        if (userId) {
            posthog.identify(userId)
        }
    }, [userId])

    if (!isLoaded) return null

    if (!isSignedIn) {
        return (
            <SignInButton>
                <Button>
                    Sign in
                </Button>
            </SignInButton>
        )
    }

    return (
        <SignOutButton>
            <Button type='inline'>
                Sign out
            </Button>
        </SignOutButton>
    )
}