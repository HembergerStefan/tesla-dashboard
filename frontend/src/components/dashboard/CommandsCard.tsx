"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {Button} from "@/components/ui/button"

type CommandsCardProps = {
    flashAction: () => void;
    honkAction: () => void;
    trunkAction: () => void;
}

export function CommandsCard({flashAction, honkAction, trunkAction}: CommandsCardProps) {
    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Commands</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
                <Button variant="outline" className="w-full" onClick={flashAction}>💡 Flash Lights</Button>
                <Button variant="outline" className="w-full" onClick={honkAction}>📣 Honk Horn</Button>
                <Button variant="outline" className="w-full" onClick={trunkAction}>📦 Actuate Rear Trunk</Button>
            </CardContent>
        </Card>
    )
}
