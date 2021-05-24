import Link from "next/link";
import { useState } from "react";
import NavItemDetails from "./NavItemDetails";
import { NAV_ITEMS } from "../../../config/config";
import NavItem from "./NavItem";
import styles from "./NavList.module.css";
import AuthGoogle from "../../Auth/AuthGoogle";
import Image from "next/image";
const Navlist = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [name, setName] = useState("");
  const hoverHandler = (show, navItemName = "") => {
    setShowDetails(show);
    setName(navItemName);
  };
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>
          <Image src="/p2.png" alt="logo" width="40" height="40" />
        </div>
      </Link>
      <nav>
        <ul>
          {NAV_ITEMS.map(item => (
            <NavItem key={item.name} {...item} onHover={hoverHandler} />
          ))}
          <li className={styles.login}>
            <AuthGoogle />
          </li>
        </ul>
      </nav>
      {showDetails && <NavItemDetails show name={name} />}
    </header>
  );
};

export default Navlist;
