import { createTRPCRouter } from "~/server/api/trpc";
import { ffRouter } from './routers/ffRouter'
/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  ff:ffRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
