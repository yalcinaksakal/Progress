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
            {NAV_LIST.map((item, index) => (
              <NavItem
                key={item}
                item={item}
                isLast={index === NAV_LIST.length - 1}
                isBeforeLast={index === NAV_LIST.length - 2}
              />
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navlist;
