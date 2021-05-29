import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./NavItem.module.css";
import { useState } from "react";
import NavItemDetails from "./NavItemDetails";
import { NAV_ITEMS } from "../../../config/config";
import SvgIcon from "@material-ui/core/SvgIcon";
import Auth from "../../Auth/Auth";


const NavItem = ({ item, isLast, isBeforeLast }) => {
  const router = useRouter();
  const path = `/${item}`;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <li
      className={`${styles.item} ${
        router.pathname === path ? styles.active : ""
      }`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {item !== "login" ? (
        <Link href={path}>
          <SvgIcon viewBox="0 0 23 23">{NAV_ITEMS[item].svg}</SvgIcon>
        </Link>
      ) : (
        <Auth />
      )}
      {showDetails && window.innerWidth > 400 && (
        <NavItemDetails
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
          show
          name={NAV_ITEMS[item].name}
          isLast={isLast}
          isBeforeLast={isBeforeLast}
        />
      )}
    </li>
  );
};

export default NavItem;
