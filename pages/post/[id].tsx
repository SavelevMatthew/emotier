import Error from 'next/error'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import React from 'react'

import { trpc } from '@/client/trpc'
import { Container } from '@/components/container'
import { Header } from '@/components/header'
import { Loader } from '@/components/loader'
import { PostView } from '@/components/post-view'
import { generateSSGHelper } from '@/server/helpers/ssg'

import type { GetStaticProps, GetStaticPaths, NextPage } from 'next'


const inter = Inter({ subsets: ['latin'] })

type PostPageProps = { postId: string }

const PostPage: NextPage<PostPageProps> = ({ postId }) => {
    const { data, isLoading } = trpc.post.getById.useQuery({ id: postId })

    if (!data) {
        return <Error statusCode={404}/>
    }

    return (
        <>
            <Head>
                <title>Post on Emotier</title>
            </Head>
            <Header/>
            <main className={inter.className}>
                <Container className='py-10 flex flex-col gap-y-10'>
                    {isLoading && (
                        <div className='flex justify-center' >
                            <Loader/>
                        </div>
                    )}
                    <PostView post={data.post} author={data.author}/>
                </Container>
            </main>
        </>
    )
}

export default PostPage

export const getStaticProps: GetStaticProps = async (context) => {
    const ssg = generateSSGHelper()

    const postId = context.params?.id

    if (!postId || Array.isArray(postId)) return {
        notFound: true,
    }

    await ssg.post.getById.prefetch({ id: postId })

    return {
        props: {
            trpcState: ssg.dehydrate(),
            postId,
        },
    }
}

export const getStaticPaths: GetStaticPaths = () => {
    return { paths: [], fallback: 'blocking' }
}
