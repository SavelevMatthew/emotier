import { z } from 'zod'

const server = z.object({
    DATABASE_URL: z.string().min(1),
    SHADOW_DATABASE_URL: z.string().min(1),
    NODE_ENV: z.enum(['development', 'production', 'test']),
    CLERK_SECRET_KEY: z.string(),
    PORT: z.string().optional()
})

const client = z.object({
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
    VERCEL_URL: z.string().optional(),
})

const merged = server.merge(client)

/**
 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
 * middlewares) or client-side, so we need to destruct manually.
 *
 * @type {Record<keyof z.infer<typeof server> | keyof z.infer<typeof client>, string | undefined>}
 */
const processEnv = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SHADOW_DATABASE_URL: process.env.SHADOW_DATABASE_URL,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    VERCEL_URL: process.env.VERCEL_URL,
    PORT: process.env.PORT
}

/** @typedef {z.input<typeof merged>} MergedInput */
/** @typedef {z.infer<typeof merged>} MergedOutput */
/** @typedef {z.SafeParseReturnType<MergedInput, MergedOutput>} MergedSafeParseReturn */

let env = /** @type {MergedOutput} */ (process.env)

if (typeof process.env.SKIP_ENV_VALIDATION !== 'string' || process.env.SKIP_ENV_VALIDATION.toLowerCase() !== 'false') {
    const isServer = typeof window === 'undefined'
    const parsed = /** @type {MergedSafeParseReturn} */ isServer
        ? merged.safeParse(processEnv)
        : client.safeParse(processEnv)

    if (parsed.success === false) {
        console.error(
            "❌ Invalid environment variables:",
            parsed.error.flatten().fieldErrors,
        );
        throw new Error("Invalid environment variables");
    }

    env = /** @type {MergedOutput} */ (new Proxy(parsed.data, {
        get(target, prop) {
            if (typeof prop !== "string") return undefined;
            // Throw a descriptive error if a server-side env var is accessed on the client
            // Otherwise it would just be returning `undefined` and be annoying to debug
            if (!isServer && !prop.startsWith("NEXT_PUBLIC_"))
                throw new Error(
                    process.env.NODE_ENV === "production"
                        ? "❌ Attempted to access a server-side environment variable on the client"
                        : `❌ Attempted to access server-side environment variable '${prop}' on the client`,
                );
            return target[/** @type {keyof typeof target} */ (prop)];
        },
    }))
}

export { env }