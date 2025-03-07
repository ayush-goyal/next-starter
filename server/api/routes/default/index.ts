import getHelloWorld from "./getHelloWorld";
import { createTRPCRouter } from "server/api/trpc";

export const defaultRouter = createTRPCRouter({
  getHelloWorld,
});
