import { type Dispatch, type SetStateAction } from "react";

interface TokenCardProps {
  token: {
    tokenAddress: string;
    balance: number;
    symbol: string;
  } | null;
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
}
const TokenCard = ({ token, selectedToken, selectToken }: TokenCardProps) => {
  return (
    <div className="flex items-center justify-center bg-white px-2">
      <input type="text" className="input" placeholder="Enter amount" />
      <div className="rounded-lg bg-white p-6 text-xl text-black">
        {token?.balance} {token?.symbol}
      </div>
      <button className="btn-circle btn">+</button>
    </div>
  );
};

export default TokenCard;
