import { createServerSideHelpers } from '@trpc/react-query/server'
import Error from 'next/error'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import React from 'react'
import superJson from 'superjson'

import { trpc } from '@/client/trpc'
import { Container } from '@/components/container'
import { Header } from '@/components/header'
import { Loader } from '@/components/loader'
import { PostView } from '@/components/post-view'
import { ProfileOverview } from '@/components/profile-overview'
import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/db'

import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'


const inter = Inter({ subsets: ['latin'] })


type UserPostFeedProps = {
    userId: string
}
const UserPostFeed: React.FC<UserPostFeedProps> = ({ userId }) => {
    const { data, isLoading } = trpc.post.getByAuthorId.useQuery({ id: userId })

    if (isLoading) {
        return (
            <div className='flex justify-center' >
                <Loader/>
            </div>
        )
    }

    if (!data || !data.length) {
        return <h2 className='font-semibold text-xl text-gray-600'>Author has no emotes yet 😔</h2>
    }
    
    return (
        <>
            <h2 className='font-semibold text-xl text-gray-600'>Latest authors emotes:</h2>
            {data.map(post => (
                <PostView post={post.post} author={post.author} key={post.post.id}/>
            ))}
        </>
    )
}

type UserPageProps = { userId: string }

const UserPage: NextPage<UserPageProps> = ({ userId }) => {
    const { data, isLoading } = trpc.profile.getById.useQuery({ id: userId })

    if (!data) {
        return <Error statusCode={404}/>
    }

    const pageTitle = `${data.name} on Emotier`

    return (
        <>
            <Head>
                <title>{pageTitle}</title>
            </Head>
            <Header/>
            <main className={inter.className}>
                <Container className='py-10 flex flex-col gap-y-10'>
                    {isLoading && (
                        <div className='flex justify-center' >
                            <Loader/>
                        </div>
                    )}
                    <ProfileOverview user={data}/>
                    <UserPostFeed userId={userId}/>
                </Container>
            </main>
        </>
    )
}

export default UserPage

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = createServerSideHelpers({
        router: appRouter,
        // TODO: fetch userId if needed later
        ctx: { prisma, userId: null },
        transformer: superJson,
    })

    const userId = context.params?.userId

    if (!userId || Array.isArray(userId)) return {
        notFound: true,
    }

    await ssg.profile.getById.prefetch({ id: userId })

    return {
        props: {
            trpcState: ssg.dehydrate(),
            userId,
        },
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    return { paths: [], fallback: 'blocking' }
}
