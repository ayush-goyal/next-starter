# Next.js Full-Stack Starter Template

A modern, full-stack template for building web applications with Next.js 15.

## Overview

This template provides a solid foundation for building modern web applications. It leverages the power of Next.js, tRPC, Prisma, and PostgreSQL to provide a seamless development experience with end-to-end type safety.

## Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Customizable UI components
- **Lucide React** - Icon library
- **Luxon** - Date formatting library
- **Sentry** - Error tracking and performance monitoring

### Backend

- **tRPC** - End-to-end typesafe API
- **Prisma** - ORM for database access
- **PostgreSQL** - Relational database
- **Zod** - TypeScript-first schema validation
- **Better Auth** - Authentication with built-in pages and Google OAuth
- **Vercel AI SDK** - Make LLM AI requests easily
- **Sentry** - Server-side error tracking and performance monitoring

### Development Tools

- **TypeScript** - Static type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Yarn** - Package manager

## Authentication

The template comes with pre-built authentication pages and features:

- `/sign-in` - Email/password and Google OAuth login
- `/sign-up` - User registration
- `/forgot-password` - Password reset request
- `/reset-password` - Password reset with token
- Protected routes (e.g. `/dashboard`) with middleware

For more details on authentication features and customization, visit [Better Auth documentation](https://better-auth.dev).

## Error Tracking and Monitoring

This template includes Sentry for error tracking and performance monitoring:

- Automatic error capturing for both client and server
- Performance monitoring with transactions and spans
- Session replay for reproducing user issues

## Using This Template

### Method 1: GitHub Template

1. Click the "Use this template" button at the top of the repository
2. Name your new repository and create it
3. Clone your new repository locally

### Method 2: Manual Clone

```bash
git clone https://github.com/ayush-goyal/next-starter.git my-project
cd my-project
```

## Getting Started

### Prerequisites

- Node.js (v20 or higher)
- Yarn
- PostgreSQL database

### Installation

1. Install dependencies

```bash
yarn install
```

2. Set up environment variables

```bash
cp .env.example .env
```

Required environment variables:

```env
# Database Configuration
DATABASE_URL=          # Your PostgreSQL connection string with connection pooling
DATABASE_DIRECT_URL=   # Direct PostgreSQL connection string (for migrations)

# Authentication
BETTER_AUTH_SECRET=    # Generate with: openssl rand -base64 32
BETTER_AUTH_URL=       # Your app URL (e.g. http://localhost:3000)

# Google OAuth (Get from Google Cloud Console)
GOOGLE_CLIENT_ID=      # Your Google OAuth client ID
GOOGLE_CLIENT_SECRET=  # Your Google OAuth client secret

# Email (for password reset)
RESEND_API_KEY=       # Get from https://resend.com

# Sentry
NEXT_PUBLIC_SENTRY_DSN= # Your Sentry DSN for client-side tracking
SENTRY_ORG=             # Your Sentry Organization
SENTRY_PROJECT=         # Your Sentry Project
SENTRY_AUTH_TOKEN=      # Your Sentry Auth Token

# PostHog
NEXT_PUBLIC_POSTHOG_KEY=   # Your PostHog API key
NEXT_PUBLIC_POSTHOG_HOST=  # Your PostHog host URL
```

3. Set up the database

```bash
yarn db:push
```

4. Start the development server

```bash
yarn dev
```

The application will be available at http://localhost:3000

### Database Schema

Modify the Prisma schema in `/prisma/schema.prisma` to match your application's data model.

## Project Structure

- `/app` - Next.js App Router pages
- `/components` - Reusable UI components
- `/emails` - React Email templates for transactional emails
- `/lib` - Utility functions and shared code
- `/prisma` - Database schema and migrations
- `/public` - Static assets
- `/server` - Server-side code and API route handlers
- `/styles` - Global styles
- `/trpc` - tRPC API setup and configuration

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project and enable Google OAuth
3. Configure OAuth consent screen
4. Create OAuth 2.0 credentials (Web application)
5. Add authorized redirect URIs:

   - Development: `http://localhost:3000/api/auth/callback/google`
   - Production: `https://your-domain.com/api/auth/callback/google`

## Sentry Setup

1. Create an account at [Sentry](https://sentry.io)
2. Create a new project for your application
3. Get your DSN from the project settings
4. Add the DSN to your environment variables:
   - `SENTRY_DSN` - For server-side tracking
   - `NEXT_PUBLIC_SENTRY_DSN` - For client-side tracking
5. Test your setup by visiting the homepage and clicking the "Test Error" button

## Email Templates

The template includes [React Email](https://react.email) for building and previewing emails using React components:

```bash
# Preview email templates in the browser
yarn dev:email
```

Email templates in the `/emails` directory can be used with Resend to send transactional emails like password reset notifications.
