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

### Backend

- **tRPC** - End-to-end typesafe API
- **Prisma** - ORM for database access
- **PostgreSQL** - Relational database
- **Zod** - TypeScript-first schema validation
- **Better Auth** - Authentication with built-in pages and Google OAuth
- **Vercel AI SDK** - Make LLM AI requests easily

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
