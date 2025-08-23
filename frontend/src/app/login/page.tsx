"use client"

import {useEffect, useState} from "react"
import {useRouter} from "next/navigation"
import {useAuthStatus} from "@/hooks/useAuthStatus"
import {APIClient} from "@/lib/api/client"
import {SessionStatusEnum} from "../../../../shared/dto/sessionStatus.dto"
import {Input} from "@/components/ui/input"
import {Button} from "@/components/ui/button"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import LoadingScreen from "@/components/ui/loading-screen"

export default function LoginPage() {

    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const status = useAuthStatus()
    const router = useRouter()

    useEffect(() => {
        if (status === SessionStatusEnum.Ready || status === SessionStatusEnum.Offline) {
            router.replace("/dashboard")
        }
    }, [status, router])

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setError("")
        try {
            const data = await APIClient.login(password)
            router.push(data.redirect);
        } catch {
            setError("Invalid password or server error")
        }
    }

    if (status !== SessionStatusEnum.Unauthenticated) {
        return <LoadingScreen/>
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Tesla Dashboard</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button type="submit" className="w-full">Login</Button>
                        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
