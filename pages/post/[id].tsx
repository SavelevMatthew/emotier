import { Inter } from 'next/font/google'
import Head from 'next/head'
import React from 'react'

import { Container } from '@/components/container'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export default function PostPage () {
    return (
        <>
            <Head>
                <title>Emotier</title>
            </Head>
            <Header/>
            <main className={inter.className}>
                <Container className='py-10 flex flex-col gap-y-10'>
                    POST PAGE
                </Container>
            </main>
        </>
    )
}
