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

### Development Tools

- **TypeScript** - Static type checking
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Yarn** - Package manager

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

Edit the `.env` file with your database credentials and other required variables.

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
