import { type OwnedNft } from "alchemy-sdk";
import Connect from "components/Connect";
import NftCard from "components/NftCard/NftCard";
import { type NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { useAccount } from "wagmi";
import { api } from "~/utils/api";

const stashStyles =
  "grid grid-cols-3 overflow-auto items-center justify-center gap-4 p-4 bg-white rounded-lg text-black w-full h-96";

const openTradeContainerStyles =
  "flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg text-black h-48";

const Home: NextPage = () => {
  const { data: receiverData } = api.assets.fetchReceiverAssets.useQuery({
    receiverAddress: "0xc948f2F172Fe25977E322c8D82F8f53338f8a051",
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

  console.log(senderData?.nfts.ownedNfts[0]);
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
            <h1 className="text-4xl font-bold text-white">Swapsies</h1>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-y-2">
              <div className={openTradeContainerStyles}>
                {senderNft && <NftCard nft={senderNft} />}
              </div>
              <Connect />
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
            <div className="flex gap-2">
              <input type="checkbox" className="w-16 rounded-lg bg-white p-2" />
              <input
                type="checkbox"
                disabled
                className="w-16 rounded-lg bg-white p-2"
              />
            </div>
            <div className="flex w-full flex-col gap-y-2">
              <div className={openTradeContainerStyles}>
                {receiverNft && <NftCard nft={receiverNft} />}
              </div>
              <div>
                <label htmlFor="receiverAddress" className="label">
                  Receiver Address
                  <input
                    name="receiverAddress"
                    type="text"
                    className="input"
                    value="0xc948f2F172Fe25977E322c8D82F8f53338f8a051"
                  />
                </label>
              </div>
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
