"use client"

import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import {InfoRow} from "@/components/dashboard/InfoRow"

type VehicleInfoCardProps = {
    outside: number;
    inside: number;
    rangeKm: number;
    batteryLevel: number;
    lastUpdated: string | null;
}

export function VehicleInfoCard({outside, inside, rangeKm, batteryLevel, lastUpdated}: VehicleInfoCardProps) {

    const clampedLevel = Math.min(100, Math.round(batteryLevel));
    const batteryColor = `hsl(${(clampedLevel / 100) * 120}, 70%, 45%)`;

    return (
        <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-base">Vehicle Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
                <InfoRow label="Outside Temperature" value={`${outside} °C`}/>
                <InfoRow label="Inside Temperature" value={`${inside} °C`}/>
                <InfoRow label="Range" value={`${rangeKm.toFixed(1)} km`}/>
                <InfoRow label="Last updated" value={lastUpdated ?? "—"}/>

                {/* Battery bar */}
                <div className="mt-2 w-full overflow-hidden rounded-full bg-gray-200">
                    <div
                        className="flex h-5 items-center justify-center text-[11px] font-medium text-white transition-[width]"
                        style={{width: `${clampedLevel}%`, backgroundColor: batteryColor}}>
                        {clampedLevel}%
                    </div>
                </div>
            </CardContent>
        </Card>
    )
}

