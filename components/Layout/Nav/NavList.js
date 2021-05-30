import Link from "next/link";
import NavItem from "./NavItem";
import styles from "./NavList.module.css";
import Image from "next/image";
import { useSelector } from "react-redux";

const Navlist = () => {
  const loginState = useSelector(state => state.auth);

  const navList = loginState.isLoggedIn
    ? ["categories", "cart", "favourites", "profile", "logout"]
    : ["categories", "cart", "login"];
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
            {navList.map((listItem, index) => {
              const item =
                listItem === "login" && loginState.isLoading
                  ? "loading"
                  : listItem;
              return (
                <NavItem
                  key={item}
                  item={item}
                  isLast={index === navList.length - 1}
                  isBeforeLast={index === navList.length - 2}
                />
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navlist;
