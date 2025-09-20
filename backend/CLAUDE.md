# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a production-ready Elysia-based REST API built with Bun runtime, TypeScript, PostgreSQL, and following industry best practices. The project includes comprehensive error handling, logging, API documentation, database ORM, and environment validation.

## Development Commands

- **Start development server**: `bun run dev`
  - Runs the server with watch mode for automatic reloading
  - Server runs on http://localhost:3000
- **Build for production**: `bun run build`
- **Start production server**: `bun run start`
- **Database operations**:
  - `bun run db:generate` - Generate database migrations
  - `bun run db:migrate` - Run database migrations
  - `bun run db:studio` - Open Drizzle Studio
  - `bun run db:push` - Push schema changes to database

## Project Structure

```
src/
├── config/
│   ├── env.ts          # Environment validation with Zod
│   └── swagger.ts      # Swagger/OpenAPI configuration
├── database/
│   ├── connection.ts   # Database connection setup
│   ├── migrations/     # Drizzle migration files
│   └── schemas/        # Database schema definitions
├── middlewares/
│   ├── error-handler.ts # Global error handling
│   └── logger.ts       # Request/response logging
├── routes/
│   └── health.ts       # Health check endpoints
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── index.ts           # Main application entry point
```

## Architecture

- **Runtime**: Bun (high-performance JavaScript runtime)
- **Framework**: Elysia (modern, type-safe web framework)
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod for runtime type validation
- **Documentation**: Swagger/OpenAPI with automated generation
- **Logging**: Pino with pretty printing in development
- **Error Handling**: Global error middleware with proper HTTP status codes

## Key Dependencies

- **Core**: `elysia`, `bun-types`
- **Database**: `drizzle-orm`, `postgres`, `drizzle-kit`
- **Validation**: `zod`, `drizzle-zod`
- **API Tools**: `@elysiajs/swagger`, `@elysiajs/cors`
- **Logging**: `pino`, `pino-pretty`

## Environment Setup

1. Copy `.env.example` to `.env`
2. Configure your PostgreSQL database credentials
3. Set appropriate environment variables

## Development Notes

- CORS is disabled by default (`origin: false`)
- Strict TypeScript configuration with comprehensive type checking
- Environment variables are validated at startup using Zod schemas
- Global error handling with consistent JSON error responses
- Request/response logging with structured logging (Pino)
- Swagger documentation available at `/swagger`
- Health check endpoint at `/health`
- Database migrations managed with Drizzle Kit