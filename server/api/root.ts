import { createCallerFactory, createTRPCRouter } from "server/api/trpc";
import getHelloWorld from "./routes/getHelloWorld";
/**
 * This is the primary router for your server.
 */
export const appRouter = createTRPCRouter({
  getHelloWorld: getHelloWorld,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
