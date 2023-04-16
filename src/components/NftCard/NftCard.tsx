import { type Media, type OwnedNft } from "alchemy-sdk";
import Image from "next/image";
import { useState } from "react";

interface NftCardProps {
  nft: OwnedNft;
  selectedNft?: OwnedNft[] | null;
  selectNft?: (nft: OwnedNft) => void;
}

const NftCard = ({ nft, selectedNft, selectNft }: NftCardProps) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const getImageSrc = (nftStringSrc?: Media) => {
    if (showPlaceholder || !nftStringSrc?.thumbnail) {
      return "https://via.placeholder.com/260";
    }

    return nftStringSrc.thumbnail;
  };

  const handleSelect = () => {
    console.log(nft.media);

    selectNft?.(nft);
  };

  console.log(
    selectedNft?.findIndex(
      (selected) =>
        selected.tokenId === nft.tokenId &&
        selected.contract.address === nft.contract.address
    )
  );
  return (
    <div className={`card w-full border border-black bg-white`}>
      <button className="" onClick={handleSelect}>
        <figure>
          <Image
            src={getImageSrc(nft.media[0])}
            alt="Album"
            width={260}
            height={260}
            onError={() => {
              setShowPlaceholder(true);
            }}
            className="rounded-t-xl"
          />
        </figure>
        <div className="p-4">
          <h2 className="card-title truncate text-ellipsis">
            {nft.title || "Untitled NFT"}
          </h2>
        </div>
      </button>
    </div>
  );
};

export default NftCard;
