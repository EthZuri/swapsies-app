import { type OwnedNft } from "alchemy-sdk";
import Logo from "~/components/Logo";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import Connect from "~/components/Connect";
import SelectedNft from "~/components/SelectedNft";
import BungeeText from "~/components/BungeeText/BungeeText";

const askerAddress = "0xB322B2ebC682E56dD4D138a4F409b0bD32278eD2";

const openTradeContainerStyles =
  "flex flex-col items-center gap-4 p-4 bg-white rounded-lg text-black w-full h-[500px]";

// {
//   tokenAddress: string;
//   amount: number;
//   symbol: string;
// }[]
const senderToken = [
  { amount: "1", symbol: "ETH", tokenAddress: "0x000" },
  { amount: "2", symbol: "DAI", tokenAddress: "0x111" },
];

const receiverToken = [
  { amount: "10000000", symbol: "ANT", tokenAddress: "0x000" },
  { amount: "2", symbol: "ONIS", tokenAddress: "0x111" },
];

const senderNft = [
  {
    tokenId: "1",
    contract: {
      address: "0x000",
    },
    title: "NFT 1",
  },
  {
    tokenId: "3402",
    contract: {
      address: "0x000",
    },
    title: "Happy Ape",
  },
] as OwnedNft[];

const receiverNft = [
  {
    tokenId: "1",
    contract: {
      address: "0x000",
    },
    title: "NFT 1",
  },
  {
    tokenId: "3402",
    contract: {
      address: "0x000",
    },
    title: "Happy Ape",
  },
] as OwnedNft[];

const TransactionPage: NextPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <>
      <Head>
        <title>Swapsies</title>
        <meta name="description" content="Simple p2p swaps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex  min-h-screen flex-col items-center  bg-gradient-to-b from-[#c5dadc] to-[#c5daed]">
        <div className="container flex flex-col items-center justify-center gap-4 py-4 ">
          <div className="flex w-full justify-start px-4">
            <div className="flex w-full items-center justify-between gap-2">
              <Logo />
              <Connect />
            </div>
          </div>

          {currentStep === 0 && (
            <div className="flex w-2/3 flex-col items-end gap-y-2">
              <div className="flex w-full gap-8">
                <div className="w-full">
                  <div className={openTradeContainerStyles}>
                    <div className="text-4xl text-secondary">
                      <BungeeText>What you&apos;ll get</BungeeText>
                    </div>
                    <p className="text-xs text-gray-500">
                      (From: {askerAddress})
                    </p>
                    <BungeeText>NFTs</BungeeText>
                    {senderNft ? (
                      <SelectedNft nft={senderNft} />
                    ) : (
                      <p>No NFT selected</p>
                    )}

                    <BungeeText>Tokens</BungeeText>
                    {senderToken ? (
                      <div className="flex flex-col gap-2 text-black">
                        {senderToken.map((token) => (
                          <p key={token.symbol}>
                            {token.amount} {token.symbol}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p>No token selected</p>
                    )}
                  </div>
                </div>

                <div className="w-full">
                  <div className={openTradeContainerStyles}>
                    <div className="text-4xl text-secondary">
                      <BungeeText>What you&apos;ll give</BungeeText>
                    </div>
                    <BungeeText>NFTs</BungeeText>
                    {receiverNft ? (
                      <SelectedNft nft={receiverNft} />
                    ) : (
                      <p>No NFT selected</p>
                    )}

                    <BungeeText>Tokens</BungeeText>
                    {receiverToken ? (
                      <div className="flex flex-col gap-2 text-black">
                        {receiverToken.map((token) => (
                          <p key={token.symbol}>
                            {token.amount} {token.symbol}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p>No token selected</p>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <button
                  className="btn-primary btn"
                  onClick={() => setCurrentStep(1)}
                >
                  Confirm swap
                </button>
              </div>
            </div>
          )}

          {currentStep === 1 && (
            <div className="flex w-full flex-col items-center text-black">
              <div className="flex flex-col gap-y-2 rounded-md bg-white p-4">
                <h1 className="text-xl">Swap complete! Hash number: #123</h1>
                <h2>Enjoy your new tokens!</h2>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default TransactionPage;
