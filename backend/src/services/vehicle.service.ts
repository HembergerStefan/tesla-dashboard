import { FastifyRequest } from "fastify";
import { TeslaClient } from "../lib/teslaClient";
import { VehicleDataResponse } from "../../../shared/dto/vehicleData.dto";
import { ChargingStationDataResponse } from "../../../shared/dto/chargingStationData.dto";

export class VehicleService {
    private client: TeslaClient;

    constructor(req: FastifyRequest) {
        const jwt = (req as any).jwt;
        this.client = new TeslaClient(process.env.TESLA_VEHICLE_ID!, jwt);
    }

    async getVehicleData(): Promise<VehicleDataResponse> {
        const vehicleData = await this.client.getVehicleData();
        const chargingSites = await this.client.getNearbyChargingSites();

        const chargingStations: ChargingStationDataResponse[] = [];
        for (const station of chargingSites.response.destination_charging) {
            chargingStations.push({
                name: station.name,
                isSuperCharger: false,
                longitude: station.location.long,
                latitude: station.location.lat,
                distanceKm: station.distance_miles * 1.60934,
            });
        }
        for (const station of chargingSites.response.superchargers) {
            chargingStations.push({
                name: station.name,
                isSuperCharger: true,
                longitude: station.location.long,
                latitude: station.location.lat,
                distanceKm: station.distance_miles * 1.60934,
            });
        }

        return {
            batteryLevel: vehicleData.response.charge_state.battery_level,
            batteryRangeKm: vehicleData.response.charge_state.battery_range * 1.60934,
            chargingState: vehicleData.response.charge_state.charging_state,
            insideTemp: vehicleData.response.climate_state.inside_temp,
            outsideTemp: vehicleData.response.climate_state.outside_temp,
            chargingStations: chargingStations,
        };
    }

    async wakeUp() {
        await this.client.wakeUp();
    }

    async flashLights() {
        await this.client.flashLights();
    }

    async honkHorn() {
        await this.client.honkHorn();
    }

    async actuateTrunk() {
        await this.client.actuateTrunk();
    }
}
