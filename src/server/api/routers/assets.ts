import { z } from "zod";
import { Network, Alchemy } from "alchemy-sdk";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const assetsRouter = createTRPCRouter({
  fetchReceiverAssets: publicProcedure
    .input(z.object({ receiverAddress: z.string() }))
    .query(async ({ input }) => {
      // Connect to Alchemy

      // const tokenBalances: String[] = [`${formattedBalance} ETH`];
      const tokenBalances: Array<{
        tokenAddress: string;
        balance: number;
        symbol: string;
      } | null> = [];

      // Get the NFTs of the receiver address
      const settings = {
        apiKey: "ZxqwLlN6BozfXbz4h1fS05-nu7PKnmn1",
        network: Network.ETH_GOERLI,
      };

      const alchemy = new Alchemy(settings);
      const nfts = await alchemy.nft.getNftsForOwner(input.receiverAddress);

      // Check for other tokens in wallet
      const balances = await alchemy.core.getTokenBalances(
        input.receiverAddress
      );
      // Remove tokens with zero balance
      const nonZeroBalances = balances.tokenBalances.filter((token) => {
        return token.tokenBalance !== "0";
      });

      //console.log(`Token balances of ${input.receiverAddress} \n`);

      // Loop through all tokens with non-zero balance
      for (const token of nonZeroBalances) {
        // Get balance of token
        let balance = Number(token.tokenBalance);

        // Get metadata of token
        const metadata = await alchemy.core.getTokenMetadata(
          token.contractAddress
        );

        // Compute token balance in human-readable format
        balance = balance / Math.pow(10, metadata.decimals || 2);
        balance = Number(balance.toFixed(2));

        // Print name, balance, and symbol of token
        // console.log(`${i++}. ${metadata.name}: ${balance} ${metadata.symbol}`);
        // tokenBalances.push(`${balance} ${metadata.symbol}`);
        const token_ = {
          tokenAddress: token.contractAddress,
          balance: balance,
          symbol: String(metadata.symbol),
        };
        tokenBalances.push(token_);
      }

      // Return the ETH balance and NFTs
      // console.log(balance, nfts);

      // return { balance: formattedBalance, nfts };
      //console.log(tokenBalances);
      return { tokenBalances, nfts };
    }),
});
