import { clerkClient } from '@clerk/nextjs/server'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'

import type { User } from '@clerk/nextjs/api'

type PostUser = {
    id: string
    username: string | null
    firstName: string | null
    lastName: string | null
    profileImageUrl: string
}

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
})