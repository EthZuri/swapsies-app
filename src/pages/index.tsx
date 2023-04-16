import { type OwnedNft } from "alchemy-sdk";
import Logo from "~/components/Logo";
import Stepper from "~/components/Stepper/Stepper";
import { type NextPage } from "next";
import Head from "next/head";
import { type Dispatch, type SetStateAction, useState } from "react";
import { useAccount } from "wagmi";
import { api } from "~/utils/api";
import TokenSelectorPage from "~/components/TokenSelectorPage/TokenSelectorPage";
import Connect from "~/components/Connect";
import SelectedNft from "~/components/SelectedNft";

const receiverAddress = "0x4B04015B7D7D6D54c6b7342CEc0bb581c7D25b29";

const openTradeContainerStyles =
  "flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg text-black w-full h-[500px]";

const Home: NextPage = () => {
  const { address } = useAccount();

  const { data: receiverData, isLoading: isLoadingReceiverData } =
    api.assets.fetchReceiverAssets.useQuery({
      receiverAddress,
    });
  const { data: senderData, isLoading: isLoadingSenderData } =
    api.assets.fetchReceiverAssets.useQuery(
      {
        receiverAddress: address ?? "",
      },
      {
        enabled: !!address,
      }
    );

  const [senderNft, setSenderNft] = useState<OwnedNft[] | null>(null);
  const [receiverNft, setReceiverNft] = useState<OwnedNft[] | null>(null);

  const [senderToken, setSenderToken] = useState<
    {
      tokenAddress: string;
      amount: number;
      symbol: string;
    }[]
  >();

  const [receiverToken, setReceiverToken] = useState<
    {
      tokenAddress: string;
      amount: number;
      symbol: string;
    }[]
  >();

  const [currentStep, setCurrentStep] = useState(0);

  const reset = () => {
    setSenderNft(null);
    setReceiverNft(null);
    setSenderToken(undefined);
    setReceiverToken(undefined);
    setCurrentStep(0);
  };

  const handleSelectNft = (
    nft: OwnedNft,
    setter: Dispatch<SetStateAction<OwnedNft[] | null>>
  ) => {
    setter((curr) => (curr ? [...curr, nft] : [nft]));
  };

  const handleSelectToken = (
    token: {
      tokenAddress: string;
      amount: number;
      symbol: string;
    },
    setter: Dispatch<
      SetStateAction<
        | {
            tokenAddress: string;
            amount: number;
            symbol: string;
          }[]
        | undefined
      >
    >
  ) => {
    setter((curr) => (curr ? [...curr, token] : [token]));
  };
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

          <Stepper currentStep={currentStep} />

          {currentStep === 0 && (
            <TokenSelectorPage
              selectedToken={senderToken}
              selectToken={(token) => handleSelectToken(token, setSenderToken)}
              selectedNft={senderNft}
              selectNft={(nft: OwnedNft) => {
                handleSelectNft(nft, setSenderNft);
              }}
              nftList={senderData?.nfts?.ownedNfts}
              tokenList={receiverData?.tokenBalances}
              isLoading={isLoadingReceiverData || isLoadingSenderData}
              onConfirm={() => setCurrentStep(1)}
            />
          )}
          {currentStep === 1 && (
            <div className="flex w-full flex-col gap-y-2">
              <label htmlFor="receiverAddress" className="label">
                Receiver Address
                <input
                  name="receiverAddress"
                  type="text"
                  className="input"
                  value="0xc948f2F172Fe25977E322c8D82F8f53338f8a051"
                  readOnly
                />
              </label>
              <TokenSelectorPage
                selectedNft={receiverNft}
                selectNft={(nft: OwnedNft) =>
                  handleSelectNft(nft, setReceiverNft)
                }
                nftList={receiverData?.nfts?.ownedNfts}
                tokenList={senderData?.tokenBalances}
                isLoading={isLoadingReceiverData || isLoadingSenderData}
                selectToken={(token) =>
                  handleSelectToken(token, setReceiverToken)
                }
                selectedToken={receiverToken}
                onConfirm={() => setCurrentStep(2)}
              />
            </div>
          )}
          {currentStep === 2 && (
            <div className="flex w-2/3 flex-col items-end gap-y-2">
              <div className="flex w-full gap-8">
                <div className="w-full">
                  <div className={openTradeContainerStyles}>
                    <h2>Selected NFTs</h2>
                    {senderNft ? (
                      <SelectedNft nft={senderNft} />
                    ) : (
                      <p>No NFT selected</p>
                    )}

                    <h2>Selected Tokens</h2>
                    {senderToken ? (
                      <div className="flex gap-2 text-black">
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
                    <h2>Selected NFTs</h2>
                    {receiverNft ? (
                      <SelectedNft nft={receiverNft} />
                    ) : (
                      <p>No NFT selected</p>
                    )}

                    <h2>Selected Tokens</h2>
                    {receiverToken ? (
                      <div className="flex gap-2 text-black">
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
                  onClick={() => setCurrentStep(3)}
                >
                  Open swap
                </button>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex w-full flex-col items-center text-black">
              <div className="flex flex-col gap-y-2 rounded-md bg-white p-4">
                <h1 className="text-xl">
                  The swap is open! Hash number: #123123
                </h1>
                <h2>
                  Share this link with your counterparty so they can review and
                  approve this transaction{" "}
                </h2>
                <button className="btn-primary btn" onClick={() => reset()}>
                  Create another swap
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
