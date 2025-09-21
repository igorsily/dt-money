# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a production-ready Elysia-based REST API built with Bun runtime, TypeScript, PostgreSQL, and following industry best practices. The project includes comprehensive error handling, logging, API documentation, database ORM, authentication with Better Auth, and environment validation.

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
- **Code quality**: ESLint and Prettier are configured but no npm scripts defined

## Project Structure

```
src/
├── config/
│   ├── env.ts          # Environment validation with Zod
│   └── swagger.ts      # Swagger/OpenAPI configuration with auth integration
├── database/
│   ├── connection.ts   # Database connection setup
│   ├── migrations/     # Drizzle migration files
│   └── schemas/        # Database schema definitions (users, sessions, accounts, verifications)
├── lib/
│   └── auth.ts         # Better Auth configuration and setup
├── middlewares/
│   ├── better-auth.ts  # Better Auth Elysia plugin and macro
│   ├── error-handler.ts # Global error handling
│   ├── logger.ts       # Request/response logging
│   └── swagger-auth.ts # Swagger authentication middleware
├── routes/
│   └── health.ts       # Health check endpoints
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── index.ts           # Main application entry point with auth integration
```

## Architecture

- **Runtime**: Bun (high-performance JavaScript runtime)
- **Framework**: Elysia (modern, type-safe web framework)
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Better Auth with email/password, sessions, and Drizzle adapter
- **Validation**: Zod for runtime type validation
- **Documentation**: Swagger/OpenAPI with automated generation and auth protection
- **Logging**: Pino with pretty printing in development
- **Error Handling**: Global error middleware with proper HTTP status codes

## Authentication System

- **Provider**: Better Auth with Drizzle adapter for PostgreSQL
- **Features**: Email/password authentication with 7-day session expiration
- **Password Hashing**: Using Bun's built-in password utilities
- **Session Management**: Cookie-based with 5-minute cache
- **Auth Endpoints**: Available at `/auth/*` (sign-up, sign-in, sign-out, etc.)
- **Protected Routes**: Use `auth: true` in route options to require authentication
- **Auth Macro**: Access user data via `({ user })` parameter in authenticated routes

## Key Dependencies

- **Core**: `elysia`, `bun-types`
- **Database**: `drizzle-orm`, `postgres`, `drizzle-kit`
- **Authentication**: `better-auth`, `uuidv7`
- **Validation**: `zod`, `drizzle-zod`
- **API Tools**: `@elysiajs/swagger`, `@elysiajs/cors`
- **Logging**: `pino`, `pino-pretty`
- **Code Quality**: `eslint`, `prettier`, `@typescript-eslint/*`

## Environment Setup

1. Copy `.env.example` to `.env`
2. Configure your PostgreSQL database credentials
3. Set appropriate environment variables (DATABASE_URL, PORT, NODE_ENV, LOG_LEVEL)

## Development Notes

- CORS is enabled with credentials support for authentication
- Strict TypeScript configuration with comprehensive type checking
- Environment variables are validated at startup using Zod schemas
- Global error handling with consistent JSON error responses
- Request/response logging with structured logging (Pino)
- Swagger documentation available at `/swagger` (protected by authentication)
- Health check endpoint at `/health`
- Database migrations managed with Drizzle Kit
- Authentication database schema includes users, sessions, accounts, and verifications tables