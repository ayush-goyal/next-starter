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

## Customization

### Project Name and Branding

1. Update the project name in `package.json`
2. Replace the logo in `/public/logo.svg`
3. Update the title and metadata in `/app/layout.tsx`
4. Customize colors in `/tailwind.config.js`

### Database Schema

Modify the Prisma schema in `/prisma/schema.prisma` to match your application's data model.

## Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the application for production
- `yarn start` - Start the production server
- `yarn lint` - Run ESLint
- `yarn format:write` - Format code with Prettier
- `yarn db:push` - Push schema changes to the database
- `yarn db:studio` - Open Prisma Studio to manage database
- `yarn db:generate` - Generate Prisma client
- `yarn db:migrate` - Run database migrations

## Project Structure

- `/app` - Next.js App Router pages and components
- `/components` - Reusable UI components
- `/lib` - Utility functions and shared code
- `/prisma` - Database schema and migrations
- `/public` - Static assets
- `/server` - Server-side code and API route handlers
- `/styles` - Global styles
- `/trpc` - tRPC API setup and configuration

## Deployment

This template can be deployed to various platforms:

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyourusername%2Fnextjs-starter-template)

### Railway

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/nextjs-starter)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)

## Acknowledgements

- [Next.js](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Luxon](https://moment.github.io/luxon/)
