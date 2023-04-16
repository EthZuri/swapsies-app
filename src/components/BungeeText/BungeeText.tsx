import { Bungee } from "next/font/google";

const bungee = Bungee({
  weight: ["400"],
  subsets: ["latin"],
});
const BungeeText = ({ children }: { children: string }) => {
  return <h1 className={bungee.className}>{children}</h1>;
};

export default BungeeText;
