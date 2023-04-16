import { postRouter } from '@/server/api/routers/post'
import { profileRouter } from '@/server/api/routers/profile'
import { createTRPCRouter } from '@/server/api/trpc'

export const appRouter = createTRPCRouter({
    post: postRouter,
    profile: profileRouter,
})

export type AppRouter = typeof appRouter
