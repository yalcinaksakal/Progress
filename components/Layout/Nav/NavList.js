import Link from "next/link";
import { NAV_LIST } from "../../../config/config";
import NavItem from "./NavItem";
import styles from "./NavList.module.css";
import Image from "next/image";

const Navlist = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>
          <Image src="/p2.png" alt="logo" width="40" height="40" />
        </div>
      </Link>
      <div className={styles.menu}>
        <input className={styles.search} type="text" placeholder="Search" />

        <nav>
          <ul>
            {NAV_LIST.map(item => (
              <NavItem key={item} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navlist;
