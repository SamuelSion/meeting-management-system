import { Document } from "mongoose";
import { StatusCode } from "./enums";

// Custom error that carries both an HTTP status and a readable message:
export class ClientError {

    public readonly status: StatusCode;
    public readonly message: string;

    public constructor(status: StatusCode, message: string) {
        this.status = status;
        this.message = message;
    }

    // Runs mongoose built-in schema validation and converts failures into a ClientError:
    public static async validate(document: Document): Promise<void> {
        try {
            await document.validate();
        }
        catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Validation failed.";
            throw new ClientError(StatusCode.UnprocessableContent, message);
        }
    }

}
