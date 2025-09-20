import { OpenAPI } from "@/middlewares/better-auth";

export const swaggerConfig = {
  documentation: {
    info: {
      title: "DT Money API",
      description: "API para gerenciamento financeiro pessoal",
      version: "1.0.0",
    },
    tags: [{ name: "Health", description: "Health check endpoints" }],
    servers: [
      {
        url: "http://localhost:3000",
        description: "Development server",
      },
    ],

    components: await OpenAPI.components,
    paths: await OpenAPI.getPaths(),
  },
  swaggerOptions: {
    persistAuthorization: true,
  },
};
