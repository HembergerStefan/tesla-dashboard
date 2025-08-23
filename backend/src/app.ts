import Fastify from "fastify"
import authRoutes from "./routes/auth.route"
import cors from "@fastify/cors"
import cookie from "@fastify/cookie"
import vehicleRoutes from "./routes/vehicle.route";
import * as dotenv from "dotenv"

process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';  // prevent "self-signed certificate" error at tesla proxy connection
dotenv.config()


export const buildApp = async () => {
    const app = Fastify({
        logger: true,
    })

    await app.register(cookie);
    await app.register(authRoutes, {prefix: "/api"})
    await app.register(vehicleRoutes, {prefix: "/api"})

    await app.register(cors, {
        origin: process.env.BASE_URL,
        credentials: true,
    })
    return app
}
