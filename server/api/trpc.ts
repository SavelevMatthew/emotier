import { initTRPC } from '@trpc/server'
import superJson from 'superjson'
import { ZodError } from 'zod'

import { prisma } from '@/server/db'

import type { CreateNextContextOptions } from '@trpc/server/adapters/next'

type CreateContextOptions = Record<string, never>

const createInnerTRPCContext = (_opts: CreateContextOptions) => {
    return {
        prisma,
    }
}

export const createTRPCContext = (_opts: CreateNextContextOptions) => {
    return createInnerTRPCContext({})
}

const t = initTRPC.context<typeof createTRPCContext>().create({
    transformer: superJson,
    errorFormatter ({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
        }
    },
})

export const createTRPCRouter = t.router
export const publicProcedure = t.procedure