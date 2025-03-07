import { type Context, publicProcedure } from "server/api/trpc";
import { z } from "zod";

const GetHelloWorldInputSchema = z.object({
  name: z.string().optional().default("World"),
});

interface Options {
  ctx: Context;
  input: z.infer<typeof GetHelloWorldInputSchema>;
}

const getHelloWorld = async ({ input }: Options) => {
  return `Hello ${input.name} from server`;
};

export default publicProcedure
  .input(GetHelloWorldInputSchema)
  .query(getHelloWorld);
