"use client"

import {Button} from "@/components/ui/button"
import {MapPin} from "lucide-react"

type Station = {
    name: string;
    distanceKm: number;
    isSuperCharger: boolean;
    latitude: number;
    longitude: number;
}

type StationsListProps = {
    stations: Station[];
}

export function StationsList({stations}: StationsListProps) {

    const sorted = [...stations].sort((a, b) => a.distanceKm - b.distanceKm);
    if (!sorted.length) {
        return (
            <div className="mx-auto max-w-2xl rounded-lg border bg-white p-6 text-center text-sm text-gray-600">
                No Charging Stations found
            </div>
        )
    }

    return (
        <div className="mx-auto max-w-2xl space-y-3">
            {sorted.map((s) => {
                const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${s.latitude},${s.longitude}`
                return (
                    <div key={s.name}
                         className={`flex flex-col gap-3 rounded-lg border p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between ${s.isSuperCharger ? "bg-red-50 border-red-200" : "bg-white"}`}>
                        <div className="text-sm">
                            <p className="font-semibold text-gray-900">
                                {s.name}
                                {s.isSuperCharger && (
                                    <span
                                        className="ml-2 rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-medium text-red-700">Supercharger</span>
                                )}
                            </p>
                            <p className="text-gray-500">{s.distanceKm.toFixed(1)} km</p>
                        </div>
                        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                            <Button variant="outline" className="w-full whitespace-nowrap sm:w-auto">
                                <MapPin className="mr-2 h-4 w-4"/> Show in Maps
                            </Button>
                        </a>
                    </div>
                )
            })}
        </div>
    )

}
