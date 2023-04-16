import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import type { RouterOutputs } from '@/client/trpc'

dayjs.extend(relativeTime)
type PostWithUser = RouterOutputs['post']['getAll'][number]

const IMG_SIZE = 40

export const PostView: React.FC<PostWithUser> = ({ post, author }) => {
    if (!author) {
        return null
    }

    return (
        <div className='bg-white p-4 rounded-2xl drop-shadow flex flex-col gap-y-4'>
            <div className='flex gap-x-4 items-start'>
                <Link href={`/${author.id}`}>
                    <Image src={author.profileImageUrl} alt='user avatar' width={IMG_SIZE} height={IMG_SIZE} className='rounded-full cursor-pointer'/>
                </Link>
                <div className='flex flex-col'>
                    <Link href={`/${author.id}`}>
                        <span className='font-medium hover:underline transition-all cursor-pointer'>{author.name}</span>
                    </Link>
                    <Link href={`/post/${post.id}`}>
                        <span className='text-gray-600 hover:underline transition-all text-xs'>{dayjs(post.createdAt).fromNow()}</span>
                    </Link>
                </div>
            </div>
            <span className='w-full break-all text-2xl'>
                {post.content}
            </span>
        </div>
    )
}