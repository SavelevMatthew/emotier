import React from 'react'

import { AuthAction } from './auth-action'
import { Container } from './container'

export const Header: React.FC = () => {
    return (
        <header className='w-full py-4 shadow-md h-10 box-content'>
            <Container className='flex flex-row justify-between items-center'>
                <div/>
                <AuthAction/>
            </Container>
        </header>
    )
}