import { Elysia } from "elysia";
import pino from "pino";

export const logger = pino({
  transport: {
    target: "pino-pretty",
    options: {
      colorize: true,
      translateTime: "yyyy-mm-dd HH:MM:ss",
      ignore: "pid,hostname",
    },
  },
});

export const loggerMiddleware = new Elysia()
  .onRequest(({ request }) => {
    const url = new URL(request.url);
    logger.info(
      {
        method: request.method,
        url: url.pathname,
        query: url.search,
      },
      "Incoming request"
    );
  })
  .onAfterHandle(({ request, set }) => {
    const url = new URL(request.url);
    logger.info(
      {
        method: request.method,
        url: url.pathname,
        status: set.status,
      },
      "Request completed"
    );
  })
  .onError(({ error, request }) => {
    const url = new URL(request.url);
    if (error instanceof Error) {
      logger.error(
        {
          method: request.method,
          url: url.pathname,
          message: error.message,
          stack: error.stack,
        },
        "Request error"
      );
      return;
    }
    logger.error(
      {
        method: request.method,
        url: url.pathname,
        error: String(error),
      },
      "Request error"
    );
  });
