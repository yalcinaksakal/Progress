import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./NavItem.module.css";
import { useState } from "react";
import NavItemDetails from "./NavItemDetails";
import { NAV_ITEMS2 } from "../../../config/config";
import SvgIcon from "@material-ui/core/SvgIcon";

const NavItem = ({ item }) => {
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
      <Link href={path}>
        <SvgIcon className={styles.svgIcon}>{NAV_ITEMS2[item].svg}</SvgIcon>
      </Link>
      {showDetails && (
        <NavItemDetails
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
          show
          name={NAV_ITEMS2[item].name}
        />
      )}
    </li>
  );
};

export default NavItem;
