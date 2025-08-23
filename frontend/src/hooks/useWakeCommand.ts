"use client"

import {APIClient} from "@/lib/api/client"
import {SessionStatusEnum} from "../../../shared/dto/sessionStatus.dto"
import {retry} from "@/lib/utils"
import {toast} from "sonner"
import {useRouter} from "next/navigation"
import {useCallback} from "react"

export function useWakeCommand() {

    const router = useRouter();

    return useCallback(async (action: () => Promise<void>, successMsg?: string) => {
        try {
            const status = (await APIClient.getSessionStatus()).status;
            if (status === SessionStatusEnum.Unauthenticated) {
                toast.error("Session expired");
                await APIClient.logout();
                router.replace("/login");
                return;
            } else if (status === SessionStatusEnum.Offline) {
                try {
                    await APIClient.wakeUp();
                    toast.success("Vehicle woke up");
                } catch {
                    toast.error("Wake up failed");
                    return;
                }
            }
            await retry(action, {retries: 5, delayMs: 5_000})
            if (successMsg) {
                toast.success(successMsg);
            }
        } catch {
            toast.error("Command failed")
        }
    }, [router])
}
