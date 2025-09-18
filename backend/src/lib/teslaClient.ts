import {TeslaVehicleDataResponse} from "./types/tesla/teslaVehicleDataResponse";
import {TeslaNearbyChargingSitesResponse} from "./types/tesla/teslaNearbyChargingSitesResponse";
import {TeslaVehicleResponse} from "./types/tesla/teslaVehicleResponse";
import {TeslaTokenExchangeResponse} from "./types/tesla/teslaTokenExchangeResponse";
import {TeslaVehicleListResponse} from "./types/tesla/teslaVehicleListResponse";

export class TeslaClient {
    constructor(private vehicleId: string, private jwt: string) {
    }

    private async callTesla<T>(endpoint: string, method = "GET", useProxy = false, body?: any): Promise<T> {
        const url = `${useProxy ? process.env.TESLA_PROXY_URI : process.env.TESLA_API_URI}${endpoint}`;
        const res = await fetch(url, {
            method,
            headers: {
                "Authorization": `Bearer ${this.jwt}`,
                "Content-Type": "application/json",
            },
            body: body ? JSON.stringify(body) : undefined,
        });
        if (!res.ok) {
            throw new Error(`Tesla API error: ${res.statusText}`);
        }
        return res.json();
    }

    async getVehicleList(): Promise<TeslaVehicleListResponse> {
        return this.callTesla<TeslaVehicleListResponse>(`/vehicles`);
    }

    async getVehicleData(): Promise<TeslaVehicleDataResponse> {
        return this.callTesla<TeslaVehicleDataResponse>(`/vehicles/${this.vehicleId}/vehicle_data`);
    }

    async getNearbyChargingSites(): Promise<TeslaNearbyChargingSitesResponse> {
        return this.callTesla<TeslaNearbyChargingSitesResponse>(`/vehicles/${this.vehicleId}/nearby_charging_sites`);
    }

    async getState(): Promise<TeslaVehicleResponse> {
        return this.callTesla<TeslaVehicleResponse>(`/vehicles/${this.vehicleId}`);
    }

    async wakeUp() {
        return this.callTesla(`/vehicles/${this.vehicleId}/wake_up`, "POST");
    }

    async flashLights() {
        return this.callTesla(`/vehicles/${this.vehicleId}/command/flash_lights`, "POST", true, {});
    }

    async honkHorn() {
        return this.callTesla(`/vehicles/${this.vehicleId}/command/honk_horn`, "POST", true, {});
    }

    async actuateTrunk() {
        return this.callTesla(`/vehicles/${this.vehicleId}/command/actuate_trunk`, "POST", true, {which_trunk: "rear"});
    }

    static async exchangeCodeForToken(code: string) {
        const res = await fetch(process.env.TESLA_TOKEN_EXCHANGE_URI!, {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                grant_type: process.env.TESLA_GRANT_TYPE!,
                client_id: process.env.TESLA_CLIENT_ID!,
                client_secret: process.env.TESLA_CLIENT_SECRET!,
                code: code,
                audience: process.env.TESLA_AUDIENCE!,
                redirect_uri: process.env.TESLA_REDIRECT_URI!,
            }).toString(),
        });

        if (!res.ok) {
            const errText = await res.text();
            throw new Error(`Token Exchange failed: ${res.status} - ${errText}`);
        }

        const data: TeslaTokenExchangeResponse = await res.json();
        return data;

    }
}
