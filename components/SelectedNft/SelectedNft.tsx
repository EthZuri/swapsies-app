import { type Media, type OwnedNft } from "alchemy-sdk";
import Image from "next/image";
import { type Dispatch, type SetStateAction, useState } from "react";

interface SelectedNftProps {
  nft: OwnedNft;
  selectedNft?: OwnedNft | null;
  selectNft?: Dispatch<SetStateAction<OwnedNft | null>>;
}

const SelectedNft = ({ nft, selectedNft, selectNft }: SelectedNftProps) => {
  const [showPlaceholder, setShowPlaceholder] = useState(false);

  const getImageSrc = (nftStringSrc?: Media) => {
    if (showPlaceholder || !nftStringSrc?.raw) {
      return "https://via.placeholder.com/160";
    }

    return nftStringSrc.raw;
  };

  const handleSelect = () => {
    console.log(nft.media);

    selectNft?.(nft);
  };
  return (
    <div className="card bg-base-100 shadow-xl lg:card-side">
      <button className="" onClick={handleSelect}>
        <figure>
          <Image
            src={getImageSrc(nft.media[0])}
            alt="Album"
            width={400}
            height={400}
            onError={() => {
              setShowPlaceholder(true);
            }}
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title truncate text-ellipsis">
            {nft.title || "Untitled NFT"}
          </h2>
          <div className="card-actions justify-end"></div>
        </div>
      </button>
    </div>
  );
};

export default SelectedNft;
