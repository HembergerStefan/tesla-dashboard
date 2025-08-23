import { FastifyInstance } from "fastify";
import { requireAuth } from "../middleware/authMiddleware";
import { VehicleService } from "../services/vehicle.service";
import { VehicleDataResponse } from "../../../shared/dto/vehicleData.dto";
import {handleError, handleSuccess} from "../utils/responseUtils";

export default async function vehicleRoutes(app: FastifyInstance) {
    app.addHook("preHandler", requireAuth);

    app.get("/vehicle/data", async (req, reply) => {
        const service = new VehicleService(req);
        try {
            const data = await service.getVehicleData();
            handleSuccess<VehicleDataResponse>(reply, data);
        } catch (err) {
            handleError(reply, "Could not load vehicle data", err);
        }
    });

    app.post("/vehicle/wake-up", async (req, reply) => {
        const service = new VehicleService(req);
        try {
            await service.wakeUp();
            handleSuccess(reply);
        } catch (err) {
            handleError(reply, "Wake up failed", err);
        }
    });

    app.post("/vehicle/flash-lights", async (req, reply) => {
        const service = new VehicleService(req);
        try {
            await service.flashLights();
            handleSuccess(reply);
        } catch (err) {
            handleError(reply, "Flashing lights failed", err);
        }
    });

    app.post("/vehicle/honk-horn", async (req, reply) => {
        const service = new VehicleService(req);
        try {
            await service.honkHorn();
            handleSuccess(reply);
        } catch (err) {
            handleError(reply, "Honking horn failed", err);
        }
    });

    app.post("/vehicle/actuate-trunk", async (req, reply) => {
        const service = new VehicleService(req);
        try {
            await service.actuateTrunk();
            handleSuccess(reply);
        } catch (err) {
            handleError(reply, "Actuating trunk failed", err);
        }
    });
}
