import { type OwnedNft } from "alchemy-sdk";
import NftCard from "../NftCard";
import SelectedNft from "../SelectedNft";
import { useState, type ChangeEvent, useEffect } from "react";

const stashStylesToken =
  "gap-4 p-4 bg-base-100 border-black text-black w-full h-[580px] flex justify-center items-center ";

const openTradeContainerStyles =
  "flex flex-col items-start justify-start gap-4 p-4 bg-white rounded-lg text-black w-full h-[500px]";

interface TokenSelectorPageProps {
  selectedToken:
    | {
        tokenAddress: string;
        amount: number;
        symbol: string;
      }[]
    | undefined;
  selectToken: (token: {
    tokenAddress: string;
    amount: number;
    symbol: string;
  }) => void;
  selectedNft: OwnedNft[] | null;
  selectNft: (nft: OwnedNft) => void;
  nftList: OwnedNft[] | undefined;
  tokenList:
    | ({
        tokenAddress: string;
        balance: number;
        symbol: string;
      } | null)[]
    | undefined;
  isLoading: boolean;
  onConfirm: () => void;
}

const TokenSelectorPage = ({
  selectedNft,
  selectNft,
  selectToken,
  selectedToken,
  nftList,
  tokenList,
  isLoading,
  onConfirm,
}: TokenSelectorPageProps) => {
  const [selectedTab, setSelectedTab] = useState(0);

  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [tokenAmount, setTokenAmount] = useState("");

  const handleTokenSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSymbol(e.target?.value);
  };

  useEffect(() => {
    setSelectedSymbol(tokenList?.[0]?.symbol || "");
  }, [tokenList]);

  return (
    <div className="flex w-full justify-between gap-8">
      <div className="flex w-full flex-col">
        <div className="tabs">
          <a
            className={`tab-lifted tab ${
              selectedTab === 0 ? "tab-active" : "text-black"
            }`}
            onClick={() => setSelectedTab(0)}
          >
            NFTs
          </a>
          <a
            className={`tab-lifted tab ${
              selectedTab === 1 ? "tab-active" : "text-black"
            }`}
            onClick={() => setSelectedTab(1)}
          >
            Tokens
          </a>
        </div>
        {selectedTab === 0 && (
          <div
            className={`grid h-[580px] w-full grid-cols-3 items-center justify-center gap-4 overflow-auto border-black bg-base-100 p-4 text-black`}
          >
            {!nftList ? (
              <div className="col-span-3 flex h-96 w-full items-center justify-center">
                <p className="whitespace-nowrap text-7xl text-white">
                  No NFT to display
                </p>
              </div>
            ) : (
              nftList.map((nft) => (
                <NftCard
                  key={`${nft.tokenId}-${nft.contract.address}`}
                  nft={nft}
                  selectedNft={selectedNft}
                  selectNft={selectNft}
                />
              ))
            )}
          </div>
        )}

        {selectedTab === 1 && (
          <div className={stashStylesToken}>
            <div className="flex flex-col gap-y-2 text-black">
              <h2 className="text-black">Available tokens</h2>
              <select
                className="min-w-md select-bordered select w-full"
                onChange={(e) => handleTokenSelect(e)}
              >
                {tokenList?.map((token) => (
                  <option key={token?.tokenAddress} value={token?.symbol}>
                    {token?.balance} {token?.symbol}
                  </option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Enter amount"
                className="input-bordered input text-black"
                onChange={(e) => setTokenAmount(e.target.value)}
                value={tokenAmount}
              />
              <button
                className="btn-primary btn"
                disabled={!selectedSymbol || !tokenAmount}
                onClick={() => {
                  const selectedToken = tokenList?.find(
                    (token) => token?.symbol === selectedSymbol
                  );
                  if (!selectedToken) return;
                  selectToken({
                    tokenAddress: selectedToken?.tokenAddress,
                    amount: Number(tokenAmount),
                    symbol: selectedToken?.symbol,
                  });
                }}
              >
                Add to swap
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex w-1/2 flex-col">
        <h2 className="text-black">Your offer</h2>
        <div className={openTradeContainerStyles}>
          <div className="flex h-64 flex-col items-start">
            <h2>Selected NFTs</h2>
            {selectedNft ? (
              <SelectedNft nft={selectedNft} />
            ) : (
              <p className="mt-2 text-sm text-zinc-400"> No NFT selected</p>
            )}
          </div>

          <div className="flex flex-col">
            <h2>Selected Tokens</h2>
            {selectedToken ? (
              selectedToken.map((token) => (
                <div className="flex gap-2 text-black" key={token.symbol}>
                  <p>
                    {token.amount} {token.symbol}
                  </p>
                </div>
              ))
            ) : (
              <p className="mt-2 text-sm text-zinc-400">No token selected</p>
            )}
          </div>
        </div>
        <button
          className="btn-primary btn mt-2"
          disabled={!selectedNft && !selectedToken}
          onClick={() => onConfirm()}
        >
          Confirm selection
        </button>
      </div>
    </div>
  );
};

export default TokenSelectorPage;
