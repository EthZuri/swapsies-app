import BungeeText from "../BungeeText/BungeeText";
import styles from "./Logo.module.css";

const Logo = () => {
  return (
    <div className={styles.logo}>
      <BungeeText>Swaps.es</BungeeText>
    </div>
  );
};

export default Logo;
