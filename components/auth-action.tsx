'use client'
import { useAuth, SignInButton, SignOutButton } from '@clerk/nextjs'
import React from 'react'

import { Button } from './button'

export const AuthAction: React.FC = () => {
    const { isLoaded, isSignedIn } = useAuth()
    if (!isLoaded || !isSignedIn) {
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