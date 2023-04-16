import { clerkClient } from '@clerk/nextjs/server'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { filterUser } from '@/server/helpers/userFilter'

export const profileRouter = createTRPCRouter({
    getById: publicProcedure
        .input(z.object({
            id: z.string(),
        })).query(async ({ input }) => {
            const [user] = await clerkClient.users.getUserList({ userId: [input.id] })
            if (!user) {
                throw new TRPCError({ code: 'NOT_FOUND', message: 'User not found' })
            }

            return filterUser(user)
        }),
})