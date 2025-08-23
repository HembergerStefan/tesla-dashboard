"use client"

import LoadingScreen from "@/components/ui/loading-screen"
import {Topbar} from "@/components/dashboard/Topbar"
import {VehicleInfoCard} from "@/components/dashboard/VehicleInfoCard"
import {CommandsCard} from "@/components/dashboard/CommandsCard"
import {StationsList} from "@/components/dashboard/StationsList"
import {useDashboardData} from "@/hooks/useDashboardData"
import {useWakeCommand} from "@/hooks/useWakeCommand"
import {APIClient} from "@/lib/api/client"
import {toast} from "sonner"
import {useRouter} from "next/navigation";

export default function DashboardPage() {

    const {vehicle, loadError, lastUpdated} = useDashboardData()
    const runCommandWithWakeCheck = useWakeCommand()
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await APIClient.logout();
            router.replace("/login");
        } catch {
            toast.error("Logout failed");
        }
    }

    if (loadError) return <LoadingScreen text="Could not load vehicle data. Try again later."/>
    if (!vehicle) return <LoadingScreen text="Trying to fetch vehicle data ..."/>

    return (
        <div className="min-h-screen bg-[#f9fafb] text-gray-800">
            <Topbar logoutAction={handleLogout}/>
            <main className="mx-auto max-w-5xl space-y-8 px-6 py-8">
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <VehicleInfoCard
                        outside={vehicle.outsideTemp}
                        inside={vehicle.insideTemp}
                        rangeKm={vehicle.batteryRangeKm}
                        batteryLevel={vehicle.batteryLevel}
                        lastUpdated={lastUpdated}
                    />
                    <CommandsCard
                        flashAction={() => runCommandWithWakeCheck(APIClient.flashLights, "Lights flashed")}
                        honkAction={() => runCommandWithWakeCheck(APIClient.honkHorn, "Horn honked")}
                        trunkAction={() => runCommandWithWakeCheck(APIClient.actuateTrunk, "Rear trunk command sent")}
                    />
                </div>
                <section>
                    <h2 className="mb-4 text-center text-base font-medium">Charging Stations</h2>
                    <StationsList stations={vehicle.chargingStations}/>
                </section>
            </main>
        </div>
    )
}
