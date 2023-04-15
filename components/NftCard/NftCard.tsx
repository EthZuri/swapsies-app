import { type OwnedNft } from "alchemy-sdk";
import Image from "next/image";
import { useState } from "react";

interface NftCardProps {
  nft: OwnedNft;
}

const NftCard = ({ nft }: NftCardProps) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const getImageSrc = (nftStringSrc?: string) => {
    if (showPlaceholder || !nftStringSrc) {
      return "https://via.placeholder.com/160";
    }

    return nftStringSrc;
  };
  return (
    <div className="card bg-base-100 shadow-xl lg:card-side">
      <figure>
        <Image
          src={getImageSrc(nft.media[0]?.raw)}
          alt="Album"
          width={160}
          height={160}
          onError={(e) => {
            setShowPlaceholder(true);
          }}
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{nft.title || "Untitled NFT"}</h2>
        {nft.description && <p>{nft.description}</p>}
        <div className="card-actions justify-end">
          <button className="btn-primary btn">Select</button>
        </div>
      </div>
    </div>
  );
};

export default NftCard;
