import {FastifyRequest, FastifyReply} from "fastify";
import {getSessionToken} from "../lib/session";
import {handleError} from "../utils/responseUtils";

export const requireAuth = async (req: FastifyRequest, reply: FastifyReply) => {
    const sessionId = req.cookies.sessionId;
    if (!sessionId) {
        handleError(reply, "Not authenticated", undefined, 401);
        return;
    }

    const jwt = await getSessionToken(sessionId);
    if (!jwt) {
        handleError(reply, "Session expired", undefined, 401);
        return;
    }

    (req as any).jwt = jwt;
};
