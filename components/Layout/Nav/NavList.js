import Link from "next/link";
import { NAV_ITEMS, NAV_LIST } from "../../../config/config";
import NavItem from "./NavItem";
import SvgIcon from "@material-ui/core/SvgIcon";
import styles from "./NavList.module.css";
import Auth from "../../Auth/Auth";
import Image from "next/image";
const Navlist = () => {
  return (
    <header className={styles.header}>
      <Link href="/">
        <div className={styles.logo}>
          <Image src="/p2.png" alt="logo" width="40" height="40" />
        </div>
      </Link>
      <nav>
        <ul>
          {NAV_LIST.map(item => (
            <NavItem key={item} item={item} />
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
