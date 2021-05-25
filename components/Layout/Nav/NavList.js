import Link from "next/link";
import { useState } from "react";
import NavItemDetails from "./NavItemDetails";
import { NAV_ITEMS } from "../../../config/config";
import NavItem from "./NavItem";

import styles from "./NavList.module.css";
import Auth from "../../Auth/Auth";
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
            <li key={item.name}>
              <NavItem {...item} onHover={hoverHandler} />
              {showDetails && <NavItemDetails show name={name} />}
            </li>
          ))}
          <li className={styles.login}>
            <Auth />
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navlist;
