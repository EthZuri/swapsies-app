import { type OwnedNft } from "alchemy-sdk";

interface SelectedNftProps {
  nft: OwnedNft[];
}

const SelectedNft = ({ nft }: SelectedNftProps) => {
  return (
    <div className="flex flex-col p-2">
      {nft.map((nft) => (
        <h2
          className="card-title truncate text-ellipsis "
          key={`${nft.tokenId} - ${nft.contract.address}`}
        >
          {nft.title || "Untitled NFT"} #{nft.tokenId}
        </h2>
      ))}
    </div>
  );
};

export default SelectedNft;
