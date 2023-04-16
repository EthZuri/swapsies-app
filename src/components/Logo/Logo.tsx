import { Bungee } from "next/font/google";
import styles from "./Logo.module.css";
const bungee = Bungee({
  weight: ["400"],
  subsets: ["latin"],
});
const Logo = () => {
  return (
    <div className={styles.logo}>
      <h1 className={bungee.className}>Swaps.es</h1>
    </div>
  );
};

export default Logo;
