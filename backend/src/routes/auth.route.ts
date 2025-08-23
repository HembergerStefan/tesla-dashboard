import {FastifyInstance} from "fastify";
import {createEmptySession, deleteSession, getSessionToken, updateSessionToken} from "../lib/session";
import {TeslaClient} from "../lib/teslaClient";
import {SessionStatusEnum, SessionStatusResponse} from "../../../shared/dto/sessionStatus.dto";
import {handleError, handleSuccess} from "../utils/responseUtils";
import {RedirectResponse} from "../../../shared/dto/redirect.dto";
import {LoginRequest} from "../../../shared/dto/login.dto";
import {ExchangeCodeRequest} from "../../../shared/dto/exchangeCode.dto";

const VEHICLE_STATE_ONLINE = "online";

export default async function authRoutes(app: FastifyInstance) {

    const buildTeslaOAuthUrl = (): string => {
        const baseUrl = process.env.TESLA_AUTH_URI!;
        const params = new URLSearchParams({
            response_type: "code",
            grant_type: "client_credentials",
            client_id: process.env.TESLA_CLIENT_ID!,
            client_secret: process.env.TESLA_CLIENT_SECRET!,
            scope: process.env.TESLA_SCOPE!,
            redirect_uri: process.env.TESLA_REDIRECT_URI!,
        });
        return `${baseUrl}?${params.toString()}`;
    };

    app.post("/login", async (req, reply) => {
        const {password} = req.body as LoginRequest;
        if (password !== process.env.APP_PASSWORD) {
            handleError(reply, "Incorrect password", undefined, 401);
            return;
        }
        const sessionId = await createEmptySession();
        reply.setCookie("sessionId", sessionId, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: parseInt(process.env.SESSION_TTL_SECONDS!, 10),
        });
        handleSuccess<RedirectResponse>(reply, {redirect: buildTeslaOAuthUrl()});
    });

    app.post("/exchange-code", async (req, reply) => {
        const {code} = req.body as ExchangeCodeRequest;
        const sessionId = req.cookies.sessionId;
        if (!code || !sessionId) {
            handleError(reply, "Missing code or session", undefined, 400);
            return;
        }
        const existingValue = await getSessionToken(sessionId);
        if (existingValue === null) {
            handleError(reply, "Invalid or expired session", undefined, 401);
            return;
        }
        try {
            const token = await TeslaClient.exchangeCodeForToken(code);
            await updateSessionToken(sessionId, token.access_token);
            handleSuccess(reply);
        } catch (err) {
            handleError(reply, "Token exchange failed", err);
        }
    });

    app.post("/logout", async (req, reply) => {
        const sessionId = req.cookies.sessionId;
        if (sessionId) {
            await deleteSession(sessionId);
            reply.clearCookie("sessionId", {path: "/"});
        }
        handleSuccess(reply);
    });

    app.get("/session/status", async (req, reply) => {
        const sessionId = req.cookies.sessionId;
        if (!sessionId) {
            handleSuccess<SessionStatusResponse>(reply, {status: SessionStatusEnum.Unauthenticated});
            return;
        }
        const jwt = await getSessionToken(sessionId);
        if (!jwt) {
            handleSuccess<SessionStatusResponse>(reply, {status: SessionStatusEnum.Unauthenticated});
            return;
        }
        try {
            const client = new TeslaClient(process.env.TESLA_VEHICLE_ID!, jwt);
            const vehicleState = await client.getState();
            if (vehicleState.response.state !== VEHICLE_STATE_ONLINE) {
                handleSuccess<SessionStatusResponse>(reply, {status: SessionStatusEnum.Offline});
                return;
            }
        } catch {
            handleSuccess<SessionStatusResponse>(reply, {status: SessionStatusEnum.Unauthenticated});
            return;
        }
        handleSuccess<SessionStatusResponse>(reply, {status: SessionStatusEnum.Ready});
    });

}
