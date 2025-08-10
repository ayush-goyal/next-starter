# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Building and Running

- `yarn dev` - Start the development server at http://localhost:3000
- `yarn build` - Create production build
- `yarn start` - Start production server
- `yarn preview` - Build and start production server

### Code Quality

- `yarn lint` - Run ESLint
- `yarn lint:fix` - Fix auto-fixable lint issues
- `yarn typecheck` - Run TypeScript type checking (tsc --noEmit)
- `yarn check` - Run both linting and type checking
- `yarn format:check` - Check code formatting with Prettier
- `yarn format:write` - Auto-format code with Prettier

### Database

- `yarn db:push` - Push schema changes to database (development)
- `yarn db:generate` - Generate Prisma migrations
- `yarn db:migrate` - Apply migrations to production
- `yarn db:studio` - Open Prisma Studio for database inspection

### Email Development

- `yarn dev:email` - Preview React Email templates in browser

## High-Level Architecture

### Full-Stack Type Safety

This is a Next.js 15 app with end-to-end type safety using:

- **tRPC** for API layer - procedures defined in `server/api/routes/` are consumed via `trpc/react` client
- **Prisma** ORM with PostgreSQL - schema in `prisma/schema.prisma`
- **Zod** for runtime validation - used throughout for input/output validation
- Type imports: `RouterInputs` and `RouterOutputs` from `trpc/react` for deriving types from procedures

### Authentication Flow

- **Better Auth** handles authentication with pre-built pages at:
  - `/sign-in`, `/sign-up`, `/forgot-password`, `/reset-password`
- Auth API routes at `/api/auth/[...all]`
- Session management via `auth.api.getSession()` in tRPC context
- Protected routes use `protectedProcedure` in tRPC or middleware checks
- Supports email/password and Google OAuth

### Frontend Patterns

- **Server Components by default** - add `"use client"` only for interactivity
- **shadcn/ui** components in `components/ui/` - composed with Tailwind CSS
- **tRPC + React Query** for data fetching - avoid `useEffect` for fetching
- **Zustand** for client-only global state (UI preferences, ephemeral state)
- **react-hook-form + Zod** for form handling with validation
- **luxon** for all date formatting (not date-fns for display)

### tRPC + React Query Patterns

#### Basic Usage

```typescript
import { api, type RouterInputs, type RouterOutputs } from "trpc/react";

// Queries - avoid useEffect for fetching
const { data, isLoading, error } = api.getHelloWorld.useQuery({
  name: "World",
});

// Mutations - always invalidate on success
const utils = api.useUtils();
const { mutateAsync: updateUser } = api.user.update.useMutation({
  onSuccess: async () => {
    await utils.user.byId.invalidate();
    toast.success("User updated");
  },
  onError: (error) => {
    toast.error(error.message);
  },
});
```

#### Type Derivation

Always derive types from the router instead of duplicating:

```typescript
type HelloInput = RouterInputs["getHelloWorld"]; // { name?: string }
type HelloOutput = RouterOutputs["getHelloWorld"]; // string
type UserData = RouterOutputs["user"]["byId"]; // Full user type
```

#### Query Options

- Use `enabled` for dependent queries
- Use `keepPreviousData` for pagination
- Prefer optimistic updates for snappy UX

### Form Handling

Use react-hook-form with Zod validation and shadcn Form components:

```typescript
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const schema = z.object({
  email: z.string().email().toLowerCase().trim()
});

type FormValues = z.infer<typeof schema>;

const form = useForm<FormValues>({
  resolver: zodResolver(schema),
  defaultValues: { email: "" }
});

// In component JSX:
<Form {...form}>
  <FormField
    control={form.control}
    name="email"
    render={({ field }) => (
      <FormItem>
        <FormLabel>Email</FormLabel>
        <FormControl>
          <Input {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
</Form>
```

### State Management Guidelines

#### Zustand for Global Client State

- Select slices to prevent re-renders
- Guard browser-only APIs for SSR compatibility
- Use for: UI preferences, wizard steps, client-only feature flags
- NOT for: server data (keep in React Query)

#### Minimize useEffect

Only use `useEffect` for:

- Subscriptions/observers (PostHog pageviews, Sentry context)
- Direct DOM APIs or layout effects
- One-time initialization with no declarative option

Avoid:

- Fetching data (use tRPC useQuery)
- Mirroring props into state (derive instead)
- Syncing server data to Zustand

### UI Component Patterns

#### Using shadcn/ui + Tailwind

- Compose primitives from `components/ui/*`
- Use `cn()` from `lib/utils` for conditional classes
- Prefer design tokens: `bg-background`, `text-muted-foreground`
- Avoid inline styles - use Tailwind classes
- Keep spacing/layout classes minimal and semantic

### Date Formatting

- Always use Luxon DateTime

### Navigation Patterns

- Use `<Link>` from `next/link` for declarative navigation
- Use `useRouter().push()` for imperative flows (after mutations, auth)

### Key Integrations

- **Sentry** - Error tracking configured for client and server
- **PostHog** - Analytics and session replay
- **Stripe** - Payment processing with Better Auth Stripe plugin
- **Cloudflare R2** - Object storage for file uploads
- **Resend** - Transactional emails using React Email templates

### Project Structure

- `/app` - Next.js App Router pages and layouts
- `/server/api` - tRPC routers and procedures
- `/components` - Reusable UI components
- `/lib` - Shared utilities and configurations
- `/emails` - React Email templates
- `/prisma` - Database schema and migrations
- `/trpc` - tRPC client setup

### Environment Configuration

- Validated environment variables in `env.ts` using `@t3-oss/env-nextjs`
- Server variables: database URLs, auth secrets, API keys
- Client variables: prefixed with `NEXT_PUBLIC_`
