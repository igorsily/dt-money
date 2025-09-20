import { Elysia } from "elysia";
import { swagger } from "@elysiajs/swagger";
import { cors } from "@elysiajs/cors";
import { env } from "@/config/env";
import { swaggerConfig } from "@/config/swagger";
import { loggerMiddleware, logger } from "@/middlewares/logger";
import { errorHandler } from "@/middlewares/error-handler";
import { healthRoutes } from "@/routes/health";

const app = new Elysia()
  .use(
    cors({
      origin: true,
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Accept",
        "Origin",
        "X-Requested-With",
      ],
    }),
  )
  .use(swagger(swaggerConfig))
  .use(loggerMiddleware)
  .use(errorHandler)
  .use(healthRoutes)
  .get("/", () => ({ message: "API is running" }), {
    detail: {
      summary: "Root endpoint",
      description: "Welcome message",
      tags: ["Health"],
    },
  })
  .listen({
    port: env.PORT,
    hostname: "0.0.0.0",
  });

logger.info(
  `🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`,
);
logger.info(
  `📚 Swagger documentation available at http://${app.server?.hostname}:${app.server?.port}/swagger`,
);
