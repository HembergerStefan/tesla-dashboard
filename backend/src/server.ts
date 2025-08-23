import {buildApp} from "./app"

const start = async () => {
    const app = await buildApp()

    try {
        await app.listen({port: parseInt(process.env.BACKEND_PORT!, 10), host: "0.0.0.0"})
        console.log("🚀 Fastify ready at port: " + process.env.BACKEND_PORT!)
    } catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
