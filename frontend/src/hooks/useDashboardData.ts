"use client"

import {useEffect, useState} from "react"
import {APIClient} from "@/lib/api/client"
import {VehicleDataResponse} from "../../../shared/dto/vehicleData.dto"
import {useWakeCommand} from "./useWakeCommand"

export function useDashboardData() {

    const [vehicle, setVehicle] = useState<VehicleDataResponse | null>(null)
    const [loadError, setLoadError] = useState(false)
    const [lastUpdated, setLastUpdated] = useState<string | null>(null)
    const wakeCommand = useWakeCommand()

    useEffect(() => {
        const init = async () => {
            try {
                await wakeCommand(async () => {
                    const data = await APIClient.getVehicleData()
                    setVehicle(data)
                    setLastUpdated(new Date().toLocaleTimeString())
                })
            } catch {
                setLoadError(true)
            }
        }
        void init()
    }, [wakeCommand])

    return {vehicle, loadError, lastUpdated}
}
