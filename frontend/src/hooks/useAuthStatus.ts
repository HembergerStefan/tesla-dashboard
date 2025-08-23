"use client"

import {useEffect, useState} from "react"
import {APIClient} from "@/lib/api/client"
import {SessionStatusEnum} from "../../../shared/dto/sessionStatus.dto"

export function useAuthStatus() {

    const [status, setStatus] = useState<SessionStatusEnum | null>(null)

    useEffect(() => {
        const check = async () => {
            try {
                const response = await APIClient.getSessionStatus()
                setStatus(response.status)
            } catch {
                setStatus(SessionStatusEnum.Unauthenticated)
            }
        }
        void check()
    }, [])

    return status
}
