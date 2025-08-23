import { FastifyReply } from "fastify";
import { ApiResponse } from "../../../shared/dto/response.dto";

export const handleSuccess = <T = undefined>(reply: FastifyReply, data?: T) => {
    const response: ApiResponse<T> = { success: true };
    if (data !== undefined) {
        response.data = data;
    }
    reply.send(response);
};

export const handleError = (reply: FastifyReply, message: string, error?: unknown, statusCode = 500) => {
    console.error(message, error);
    const response: ApiResponse = { success: false };
    if (message !== undefined) {
        response.message = message;
    }
    reply.status(statusCode).send(response);
};
