import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { AuthAction } from './auth-action'
import { Container } from './container'

export const Header: React.FC = () => {
    return (
        <header className='w-full py-4 drop-shadow-sm h-10 box-content bg-white'>
            <Container className='flex flex-row justify-between items-center h-10'>
                <Link href='/'>
                    <span className='flex flex-row items-center'>
                        <h1 className='font-bold text-xl inline'>Em</h1>
                        <Image src='/apple-touch-icon.png' className='scale-125 translate-y-0.5' alt='o' width={16} height={16}/>
                        <h1 className='font-bold text-xl inline'>tier</h1>
                    </span>
                </Link>
                <AuthAction/>
            </Container>
        </header>
    )
}