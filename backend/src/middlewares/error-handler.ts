import { Elysia } from "elysia";
import { z } from "zod";

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = new Elysia({ name: "error-handler" })
  .error({
    APP_ERROR: AppError,
    VALIDATION_ERROR: z.ZodError,
  })
  .onError({ as: "global" }, ({ code, error, set }) => {
    console.error("🔥 Error occurred:", error);

    switch (code) {
      case "APP_ERROR":
        set.status = error.statusCode;
        return {
          success: false,
          error: {
            message: error.message,
            statusCode: error.statusCode,
          },
        };

      case "VALIDATION_ERROR":
        set.status = 400;
        return {
          success: false,
          error: {
            message: "Validation failed",
            statusCode: 400,
            details: error.errors.map((err: any) => ({
              field: err.path.join("."),
              message: err.message,
            })),
          },
        };

      case "NOT_FOUND":
        set.status = 404;
        return {
          success: false,
          error: {
            message: "Route not found",
            statusCode: 404,
          },
        };

      case "PARSE":
        set.status = 400;
        return {
          success: false,
          error: {
            message: "Invalid JSON body",
            statusCode: 400,
          },
        };

      default:
        set.status = 500;
        return {
          success: false,
          error: {
            message: "Internal server error",
            statusCode: 500,
          },
        };
    }
  });
