"use client"

import {useSearchParams, useRouter} from "next/navigation"
import {Suspense, useEffect, useState} from "react"
import {APIClient} from "@/lib/api/client"
import LoadingScreen from "@/components/ui/loading-screen"

enum ExchangeStatus {
    Pending = "pending",
    Success = "success",
    Error = "error"
}

// block Prerender/SSG to /callback
export const dynamic = "force-dynamic";

function CallbackInner() {

    const searchParams = useSearchParams()
    const code = searchParams.get("code")
    const router = useRouter()
    const [status, setStatus] = useState<ExchangeStatus>(ExchangeStatus.Pending)

    useEffect(() => {
        if (!code) {
            setStatus(ExchangeStatus.Error)
            return
        }
        const exchange = async () => {
            try {
                await APIClient.exchangeCode(code)
                setStatus(ExchangeStatus.Success)
                router.replace("/dashboard")
            } catch {
                setStatus(ExchangeStatus.Error)
            }
        }
        void exchange()
    }, [code, router])

    switch (status) {
        case ExchangeStatus.Pending:
            return <LoadingScreen text="Exchanging code..."/>
        case ExchangeStatus.Success:
            return <LoadingScreen text="Successfully connected. Redirecting..."/>
        case ExchangeStatus.Error:
            return <LoadingScreen text="Error during exchange. Please try again."/>
    }
}

export default function CallbackPage() {
    return (
        <Suspense fallback={<LoadingScreen text="Loading..." />}>
            <CallbackInner />
        </Suspense>
    );
}
