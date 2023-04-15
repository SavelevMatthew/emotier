import { Inter } from 'next/font/google'
import Head from 'next/head'
import React from 'react'

import { trpc } from '@/client/trpc'
import { Header } from '@/components/header'

const inter = Inter({ subsets: ['latin'] })

export default function IndexPage () {
    const { data } = trpc.post.getAll.useQuery()

    return (
        <>
            <Head>
                <title>Emotier</title>
            </Head>
            <Header/>
            <main className={inter.className}>
                {data?.map(post => (
                    <div key={post.id}>{post.content}</div>
                ))}
            </main>
        </>
    )
}
