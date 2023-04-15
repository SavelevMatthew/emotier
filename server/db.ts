import { PrismaClient } from '@prisma/client'

import { env } from '@/env.mjs'

type LogLevel = 'info' | 'query' | 'warn' | 'error'
const PROD_LOG_LEVELS: Array<LogLevel> = ['error']
const DEV_LOG_LEVELS: Array<LogLevel> = ['query', 'warn', 'error']

const globalPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined
}

export const prisma =
    globalPrisma.prisma ??
    new PrismaClient({
        log: env.NODE_ENV === 'development' ? DEV_LOG_LEVELS : PROD_LOG_LEVELS,
    })

if (env.NODE_ENV !== 'production') globalPrisma.prisma = prisma