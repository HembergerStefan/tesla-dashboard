import {VehicleDataResponse} from "../../../../shared/dto/vehicleData.dto"
import {SessionStatusResponse} from "../../../../shared/dto/sessionStatus.dto"
import {ApiResponse} from "../../../../shared/dto/response.dto"
import {RedirectResponse} from "../../../../shared/dto/redirect.dto"
import {LoginRequest} from "../../../../shared/dto/login.dto"
import {ExchangeCodeRequest} from "../../../../shared/dto/exchangeCode.dto"

const JSON_HEADERS = {"Content-Type": "application/json"} as const

export class APIClient {

    private static async fetchApi<T>(url: string, options?: RequestInit): Promise<T> {
        const res = await fetch(url, {
            credentials: "include",
            ...options
        })
        if (!res.ok) {
            throw new Error(`Request failed with status ${res.status}`)
        }
        const payload = (await res.json()) as ApiResponse
        if (!payload.success) {
            throw new Error(payload.message || "Unknown API error")
        }
        return payload.data as T
    }

    static async login(password: string): Promise<RedirectResponse> {
        const body: LoginRequest = {password}
        return APIClient.fetchApi("/api/login", {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify(body),
        })
    }

    static getVehicleData(): Promise<VehicleDataResponse> {
        return APIClient.fetchApi("/api/vehicle/data")
    }

    static wakeUp(): Promise<void> {
        return APIClient.fetchApi("/api/vehicle/wake-up", {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify({}),
        })
    }

    static flashLights(): Promise<void> {
        return APIClient.fetchApi("/api/vehicle/flash-lights", {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify({}),
        })
    }

    static actuateTrunk(): Promise<void> {
        return APIClient.fetchApi("/api/vehicle/actuate-trunk", {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify({}),
        })
    }

    static honkHorn(): Promise<void> {
        return APIClient.fetchApi("/api/vehicle/honk-horn", {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify({}),
        })
    }

    static logout(): Promise<void> {
        return APIClient.fetchApi("/api/logout", {method: "POST"})
    }

    static getSessionStatus(): Promise<SessionStatusResponse> {
        return APIClient.fetchApi("/api/session/status")
    }

    static exchangeCode(code: string): Promise<void> {
        const body: ExchangeCodeRequest = {code}
        return APIClient.fetchApi("/api/exchange-code", {
            method: "POST",
            headers: JSON_HEADERS,
            body: JSON.stringify(body),
        })
    }
}
