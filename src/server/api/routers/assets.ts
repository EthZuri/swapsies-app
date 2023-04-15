import { z } from "zod";
import { Network, Alchemy } from "alchemy-sdk";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { ethers } from "ethers";

export const assetsRouter = createTRPCRouter({
  fetchReceiverAssets: publicProcedure
    .input(z.object({ receiverAddress: z.string() }))
    .query(async ({ input }) => {
      // Connect to Alchemy
      const provider = new ethers.providers.JsonRpcProvider(
        "https://eth-goerli.g.alchemy.com/v2/ZxqwLlN6BozfXbz4h1fS05-nu7PKnmn1"
      );

      // Get the balance of the receiver address
      const balance = await provider.getBalance(input.receiverAddress);

      // Get the NFTs of the receiver address
      const settings = {
        apiKey: "ZxqwLlN6BozfXbz4h1fS05-nu7PKnmn1",
        network: Network.ETH_GOERLI,
      };

      const alchemy = new Alchemy(settings);
      const nfts = await alchemy.nft.getNftsForOwner(input.receiverAddress);

      // Return the balance and NFTs
      console.log(balance, nfts);

      return { balance, nfts };
    }),
});
