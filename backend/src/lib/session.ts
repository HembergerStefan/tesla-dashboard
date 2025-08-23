import Redis from "ioredis"
import * as crypto from "crypto"

const redis = new Redis(process.env.REDIS_URL!)
const SESSION_PREFIX = "session:"

export const createEmptySession = async (): Promise<string> => {
    const sessionId = crypto.randomUUID()
    await redis.setex(SESSION_PREFIX + sessionId, parseInt(process.env.SESSION_TTL_SECONDS!, 10), "")
    return sessionId
}

export const getSessionToken = (sessionId: string): Promise<string | null> => {
    return redis.get(SESSION_PREFIX + sessionId)
}

export const updateSessionToken = (sessionId: string, jwt: string): Promise<unknown> => {
    return redis.setex(SESSION_PREFIX + sessionId, parseInt(process.env.SESSION_TTL_SECONDS!, 10), jwt)
}

export const deleteSession = (sessionId: string): Promise<unknown> => {
    return redis.del(SESSION_PREFIX + sessionId)
}
