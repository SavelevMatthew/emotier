import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import Image from 'next/image'
import React from 'react'

import type { RouterOutputs } from '@/client/trpc'

dayjs.extend(relativeTime)
type PostWithUser = RouterOutputs['post']['getAll'][number]

const IMG_SIZE = 40

export const PostView: React.FC<PostWithUser> = ({ post, author }) => {
    if (!author) {
        return null
    }

    const authorName = author.firstName ? `${author.firstName} ${author.lastName ?? ''}` : (author.username || '')

    return (
        <div className='bg-white p-4 rounded-2xl drop-shadow flex flex-col gap-y-4'>
            <div className='flex gap-x-4 items-start'>
                <Image src={author.profileImageUrl} alt='user avatar' width={IMG_SIZE} height={IMG_SIZE} className='rounded-full'/>
                <div className='flex flex-col'>
                    <span className='font-medium'>{authorName}</span>
                    <span className='text-gray-600 text-xs'>{dayjs(post.createdAt).fromNow()}</span>
                </div>
            </div>
            <span className='w-full break-all text-2xl'>
                {post.content}
            </span>
        </div>
    )
}