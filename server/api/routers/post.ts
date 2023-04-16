import { clerkClient } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import { Ratelimit } from '@upstash/ratelimit' 
import { Redis } from '@upstash/redis'
import { z } from 'zod'

import { createTRPCRouter, privateProcedure, publicProcedure } from '@/server/api/trpc'
import { filterUser, type FilteredUser } from '@/server/helpers/userFilter'

import type{ Post } from '@prisma/client'

const NUMERIC_REGEXP = /[0-9]+/

// Rate limiting to accept no more than 3 request per minute
const rateLimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, '1 m'),
    analytics: true,
    /**
     * Optional prefix for the keys used in redis. This is useful if you want to share a redis
     * instance with other applications and want to avoid key collisions. The default prefix is
     * "@upstash/ratelimit"
     */
    prefix: '@upstash/ratelimit',
})

const addAuthorsToPosts = async (posts: Array<Post>) => {
    const users = await clerkClient.users.getUserList({
        userId: posts.map(post => post.authorId),
    })
    const userMap = new Map<string, FilteredUser>()
    for (const user of users) {
        userMap.set(user.id, filterUser(user))
    }
    return posts.map(post => ({
        post,
        author: userMap.get(post.authorId) || null,
    }))
}

const addAuthorsToPost = async (post: Post | null) => {
    if (!post) {
        return post
    }

    const [author] = await clerkClient.users.getUserList({
        userId: [post.authorId],
    })

    return {
        post,
        author: author ? filterUser(author) : null,
    }
}

export const postRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany({
            take: 100,
            orderBy: {
                createdAt: 'desc',
            },
        })

        return addAuthorsToPosts(posts)
    }),
    getByAuthorId: publicProcedure
        .input(z.object({ id: z.string() }))
        .query( async ({ ctx, input }) => {
            const posts = await ctx.prisma.post.findMany({
                where: { authorId: input.id },
                orderBy: {
                    createdAt: 'desc',
                },
                take: 100,
            })

            return addAuthorsToPosts(posts)
        }),
    getById: publicProcedure
        .input(z.object({ id: z.string() }))
        .query( async ({ ctx, input }) => {
            const post = await ctx.prisma.post.findUnique({
                where: { id: input.id },
            })

            return addAuthorsToPost(post)
        }),
    create: privateProcedure
        .input(z.object({
            content: z
                .string()
                .min(1, 'Emote must contain at least 1 emoji')
                .max(140, 'Seems like you\'re trying to write a long emoji poem, which is too long ')
                .emoji('Only emojis are allowed')
                .refine((value) =>  !NUMERIC_REGEXP.test(value), 'Numbers are not allowed'),
        }))
        .mutation(async ({ ctx, input }) => {
            const authorId = ctx.userId
            const { success } = await rateLimit.limit(authorId)

            if (!success) {
                throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })
            }

            return await ctx.prisma.post.create({
                data: {
                    authorId,
                    content: input.content,
                },
            })
        }),
})