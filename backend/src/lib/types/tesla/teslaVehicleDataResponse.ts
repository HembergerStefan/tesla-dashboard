export interface TeslaChargeStateResponse {
    battery_level: number;
    battery_range: number;
    charging_state: string;
}

export interface TeslaClimateStateResponse {
    inside_temp: number;
    outside_temp: number;
}

export interface TeslaVehicleDataResponse {
    response: {
        charge_state: TeslaChargeStateResponse;
        climate_state: TeslaClimateStateResponse;
    };
}
