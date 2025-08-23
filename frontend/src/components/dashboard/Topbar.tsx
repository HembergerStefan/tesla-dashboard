"use client"

import {Button} from "@/components/ui/button"

type TopbarProps = {
    logoutAction: () => void;
}

export function Topbar({logoutAction}: TopbarProps) {
    return (
        <header className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-6 py-3 shadow-sm">
            <h1 className="text-lg font-semibold tracking-tight">Tesla Dashboard</h1>
            <Button variant="destructive" onClick={logoutAction}>Logout</Button>
        </header>
    )
}
