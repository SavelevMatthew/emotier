import { clerkClient } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import { Ratelimit } from '@upstash/ratelimit' 
import { Redis } from '@upstash/redis'
import { z } from 'zod'

import { createTRPCRouter, privateProcedure, publicProcedure } from '@/server/api/trpc'

import type { User } from '@clerk/nextjs/api'

type PostUser = {
    id: string
    username: string | null
    firstName: string | null
    lastName: string | null
    profileImageUrl: string
}

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

const filterUser = (user: User) => ({
    id: user.id,
    username: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    profileImageUrl: user.profileImageUrl,
})

export const postRouter = createTRPCRouter({
    getAll: publicProcedure.query(async ({ ctx }) => {
        const posts = await ctx.prisma.post.findMany({
            take: 100,
            orderBy: {
                createdAt: 'desc',
            },
        })
        const users = await clerkClient.users.getUserList({
            userId: posts.map(post => post.authorId),
        })
        const userMap = new Map<string, PostUser>()
        for (const user of users) {
            userMap.set(user.id, filterUser(user))
        }

        return posts.map(post => ({
            post,
            author: userMap.get(post.authorId) || null,
        }))
    }),
    create: privateProcedure
        .input(z.object({
            content: z.string().emoji().min(1).max(140),
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