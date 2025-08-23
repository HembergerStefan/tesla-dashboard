import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export async function retry<T>(
    fn: () => Promise<T>,
    options?: {
        retries?: number
        delayMs?: number
    }
): Promise<T> {
    const {
        retries = 5,
        delayMs = 2000,
    } = options || {}

    let lastError: unknown

    for (let i = 0; i < retries; i++) {
        try {
            return await fn()
        } catch (err) {
            lastError = err
            if (i < retries - 1) {
                await new Promise(res => setTimeout(res, delayMs))
            }
        }
    }

    throw lastError
}
