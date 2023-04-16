import { type OwnedNft } from "alchemy-sdk";
import NftCard from "../NftCard";
import SelectedNft from "../SelectedNft";
import {
  useState,
  type Dispatch,
  type SetStateAction,
  type ChangeEvent,
  useEffect,
} from "react";

const stashStyles =
  "grid grid-cols-3 overflow-auto items-center justify-center gap-4 p-4 bg-base-100 border-black text-black w-full h-[580px] overflow-auto";

const stashStylesToken =
  "gap-4 p-4 bg-base-100 border-black text-black w-full h-[580px] flex justify-center items-center ";

const openTradeContainerStyles =
  "flex flex-col items-center justify-center gap-4 p-4 bg-white rounded-lg text-black w-full h-[500px]";

interface TokenSelectorPageProps {
  selectedToken:
    | {
        tokenAddress: string;
        amount: number;
        symbol: string;
      }
    | undefined;
  selectToken: Dispatch<
    SetStateAction<
      | {
          tokenAddress: string;
          amount: number;
          symbol: string;
        }
      | undefined
    >
  >;
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
        {isLoading && <div>Loading...</div>}

        {selectedTab === 0 && (
          <div className={stashStyles}>
            {!nftList
              ? "No NFT to display"
              : nftList.map((nft) => (
                  <NftCard
                    key={`${nft.tokenId}-${nft.contract.address}`}
                    nft={nft}
                    selectedNft={selectedNft}
                    selectNft={selectNft}
                  />
                ))}
          </div>
        )}

        {selectedTab === 1 && (
          <div className={stashStylesToken}>
            <div className="flex flex-col gap-y-2 text-white">
              <h2 className="text-white">Your tokens</h2>
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
                className="input-bordered input text-white"
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
          <h2>Selected NFTs</h2>
          {selectedNft ? (
            <SelectedNft nft={selectedNft} />
          ) : (
            <p>No NFT selected</p>
          )}

          <h2>Selected Tokens</h2>
          {selectedToken ? (
            <div className="flex gap-2 text-black">
              <p>
                {selectedToken.amount} {selectedToken.symbol} selected
              </p>
              <button
                className="btn-primary btn-xs btn-circle btn"
                onClick={() => selectToken(undefined)}
              >
                x
              </button>
            </div>
          ) : (
            <p>No token selected</p>
          )}
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
