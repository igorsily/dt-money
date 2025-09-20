import { Elysia, t } from 'elysia'

export const healthRoutes = new Elysia({ prefix: '/health' })
  .get('/', () => ({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  }), {
    detail: {
      summary: 'Health check',
      description: 'Check if the API is running',
      tags: ['Health'],
      responses: {
        200: {
          description: 'API is healthy',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  status: { type: 'string', example: 'ok' },
                  timestamp: { type: 'string', format: 'date-time' },
                  uptime: { type: 'number', example: 42.123 },
                },
              },
            },
          },
        },
      },
    },
  })