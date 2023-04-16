import Link from "next/link";
import BungeeText from "../BungeeText/BungeeText";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <Link href={"/"} className={styles.logo}>
      <BungeeText>Swaps.es</BungeeText>
    </Link>
  );
};

export default Logo;
