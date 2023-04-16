import { Inter } from 'next/font/google'
import Head from 'next/head'
import React from 'react'

import { trpc } from '@/client/trpc'
import { Container } from '@/components/container'
import { CreateWizard } from '@/components/create-wizard'
import { Header } from '@/components/header'
import { Loader } from '@/components/loader'
import { PostView } from '@/components/post-view'

const inter = Inter({ subsets: ['latin'] })

export default function IndexPage () {
    const { data, isLoading } = trpc.post.getAll.useQuery()

    return (
        <>
            <Head>
                <title>Emotier</title>
            </Head>
            <Header/>
            <main className={inter.className}>
                <Container className='py-10 flex flex-col gap-y-10'>
                    <CreateWizard/>
                    <h1 className='font-semibold text-xl text-gray-600'>Latest emotes:</h1>
                    {isLoading && (
                        <div className='flex justify-center' >
                            <Loader/>
                        </div>
                    )}
                    <div className='flex flex-col gap-y-4'>
                        {data?.map(post => (
                            <PostView key={post.post.id} {...post}/>
                        ))}
                    </div>
                </Container>
            </main>
        </>
    )
}
