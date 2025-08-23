export interface TeslaChargingSiteLocationResponse {
    lat: number;
    long: number;
}

export interface TeslaDestinationChargerResponse {
    name: string;
    type: "destination";
    location: TeslaChargingSiteLocationResponse;
    distance_miles: number;
}

export interface TeslaSuperchargerResponse {
    name: string;
    type: "supercharger";
    location: TeslaChargingSiteLocationResponse;
    distance_miles: number;
}

export interface TeslaNearbyChargingSitesResponse {
    response: {
        destination_charging: TeslaDestinationChargerResponse[],
        superchargers: TeslaSuperchargerResponse[];
    };
}
