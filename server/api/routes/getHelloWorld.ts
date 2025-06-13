import { publicProcedure } from "server/api/trpc";
import { z } from "zod";

const GetHelloWorldInputSchema = z.object({
  name: z.string().optional().default("World"),
});

export default publicProcedure
  .input(GetHelloWorldInputSchema)
  .query(async ({ input }) => {
    return `Hello ${input.name} from server`;
  });
