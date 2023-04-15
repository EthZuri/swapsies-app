import { type OwnedNft } from "alchemy-sdk";
import Connect from "components/Connect";
import NftCard from "components/NftCard/NftCard";
import SelectedNft from "components/SelectedNft/SelectedNft";
import abi from "contract/abi";
import { utils } from "ethers";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { api } from "~/utils/api";
const stashStyles =
  "grid grid-cols-3 overflow-auto items-center justify-center gap-4 p-4 bg-white rounded-lg text-black w-full min-h-96";

const openTradeContainerStyles =
  "flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg text-black min-h-64";

const contractAddress = "0xe0B9113392cBd5DE14CC2dd049F077fd35efa76A";
const receiverAddress = "0xc948f2F172Fe25977E322c8D82F8f53338f8a051";

const Home: NextPage = () => {
  const { data: receiverData } = api.assets.fetchReceiverAssets.useQuery({
    receiverAddress,
  });
  const { address } = useAccount();
  const { data: senderData } = api.assets.fetchReceiverAssets.useQuery(
    {
      receiverAddress: address ?? "",
    },
    {
      enabled: !!address,
    }
  );

  const [senderNft, setSenderNft] = useState<OwnedNft | null>(null);
  const [receiverNft, setReceiverNft] = useState<OwnedNft | null>(null);

  const [hash, setHash] = useState("");
  const { config } = usePrepareContractWrite({
    address: contractAddress,
    abi: abi,
    functionName: "createAsk",
    // bytes32 askHash,
    //     address asker,
    //     address filler,
    //     address askerToken,
    //     uint256 askerAmount,
    //     address fillerToken,
    //     uint256 fillerAmount

    args: [
      hash,
      address,
      receiverAddress,
      senderNft?.contract.address,
      senderNft?.tokenId,
      receiverNft?.contract.address,
      receiverNft?.tokenId,
    ],
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  const generateHash = () => {
    // struct Swap {
    //   {
    // bytes32 askHash,
    // address asker,
    // address filler,
    // address askerToken,
    // uint256 askerAmount,
    // address fillerToken,
    // uint256 fillerAmount
    // }

    const struct = {
      asker: address,
      filler: receiverAddress,
      askerToken: senderNft?.contract.address,
      askerAmount: senderNft?.tokenId,
      fillerToken: receiverNft?.contract.address,
      fillerAmount: receiverNft?.tokenId,
    };

    const hash = utils.id(JSON.stringify(struct));

    setHash(hash);
  };

  const placeSwap = () => {
    // const res = pushToContract();
    write?.();
    //  submit hash to smart contract
  };
  return (
    <>
      <Head>
        <title>Swapsies</title>
        <meta name="description" content="Simple p2p swaps" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex  min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="flex w-full justify-start px-4">
            <div className="flex w-full items-center justify-between gap-2">
              <h1 className="text-4xl font-bold text-white">Swapses</h1>{" "}
              {data && JSON.stringify(data)} {isLoading && "Loading..."}{" "}
              {isSuccess && "Success!"}
              <button
                className="btn-primary btn-lg btn"
                onClick={generateHash}
                disabled={!senderNft || !receiverNft}
              >
                Generate hash
              </button>
              <button
                className="btn-primary btn-lg btn"
                onClick={placeSwap}
                disabled={!senderNft || !receiverNft || !write}
              >
                Place swap
              </button>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="flex w-full flex-col gap-y-2">
              <Connect />
              {senderNft && (
                <div className={openTradeContainerStyles}>
                  <SelectedNft nft={senderNft} />
                </div>
              )}
              <div className={stashStyles}>
                {!senderData?.nfts
                  ? "Empty"
                  : senderData.nfts.ownedNfts.map((nft) => (
                      <NftCard
                        key={nft.tokenId}
                        nft={nft}
                        selectedNft={senderNft}
                        selectNft={setSenderNft}
                      />
                    ))}
              </div>
            </div>

            <div className="flex w-full flex-col gap-y-2">
              <label htmlFor="receiverAddress" className="label">
                Receiver Address
                <input
                  name="receiverAddress"
                  type="text"
                  className="input"
                  value="0xc948f2F172Fe25977E322c8D82F8f53338f8a051"
                />
              </label>
              {receiverNft && (
                <div className={openTradeContainerStyles}>
                  <SelectedNft nft={receiverNft} />
                </div>
              )}
              <div className={stashStyles}>
                {!receiverData?.nfts
                  ? "Empty"
                  : receiverData.nfts.ownedNfts.map((nft) => (
                      <NftCard
                        key={nft.tokenId}
                        nft={nft}
                        selectedNft={receiverNft}
                        selectNft={setReceiverNft}
                      />
                    ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
