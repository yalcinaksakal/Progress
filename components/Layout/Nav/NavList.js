import Link from "next/link";

import { NAV_ITEMS } from "../../../config/config";

import AuthGoogle from "../../Auth/AuthGoogle";
import NavItem from "./NavItem";
import styles from "./NavList.module.css";

const Navlist = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>Progress</div>
      </Link>
      <nav>
        <ul>
          {NAV_ITEMS.map(item => (
            <NavItem key={item.name} {...item} />
          ))}
          {/* <li className={router.pathname === "/profile" ? styles.active : ""}>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <span>Logout</span>
          </li>
          <li>
            <AuthGoogle />
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Navlist;
