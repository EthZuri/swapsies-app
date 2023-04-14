// import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const receiverRouter = createTRPCRouter({
  fetchAssets: publicProcedure
    // zod validator
    // .input(z.object({ receiverAddress: z.string() }))

    .query(() => {
      // Connect to alchemy

      console.log("Hola");
      // Get the balance of the receiver address
      // Get the NFTs of the receiver address

      // Return the balance and NFTs
      return {};
    }),
});
