import {ChargingStationDataResponse} from "./chargingStationData.dto";

export interface VehicleDataResponse {
    batteryLevel: number;
    batteryRangeKm: number;
    chargingState: string;
    insideTemp: number;
    outsideTemp: number;
    chargingStations: ChargingStationDataResponse[];
}
