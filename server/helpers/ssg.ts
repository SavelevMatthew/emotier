import { createServerSideHelpers } from '@trpc/react-query/server'
import superJson from 'superjson'

import { appRouter } from '@/server/api/root'
import { prisma } from '@/server/db'

export function generateSSGHelper () {
    return createServerSideHelpers({
        router: appRouter,
        // TODO: fetch userId if needed later
        ctx: { prisma, userId: null },
        transformer: superJson,
    })
}