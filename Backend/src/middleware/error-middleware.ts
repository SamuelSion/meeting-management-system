import { NextFunction, Request, Response } from "express";
import { StatusCode } from "../models/enums";
import { ClientError } from "../models/client-error";
import colors from "colors";

class ErrorMiddleware {

    // Route Not Found Middleware - runs only if no controller route matched the request:
    public routeNotFound(request: Request, response: Response, next: NextFunction): void {
        const err = new ClientError(StatusCode.NotFound, `Route ${request.originalUrl} on method ${request.method} not found.`);
        next(err);
    }

    // Catch-All Middleware - must be defined with exactly 4 parameters:
    public catchAll(err: unknown, request: Request, response: Response, next: NextFunction): void {
        const status = err instanceof ClientError ? err.status : StatusCode.InternalServerError;
        const message = err instanceof Error ? err.message : "Internal server error.";
        console.log(colors.red(`[${status}] ${message}`));
        response.status(status).json({ message });
    }

}

export const errorMiddleware = new ErrorMiddleware();
