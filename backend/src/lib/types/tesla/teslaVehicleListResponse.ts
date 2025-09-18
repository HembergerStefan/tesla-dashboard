export interface TeslaVehicleListEntryResponse {
    vin: string;
}

export interface TeslaVehicleListResponse {
    response: TeslaVehicleListEntryResponse[];
}
