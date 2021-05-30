import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./NavItem.module.css";
import { useState } from "react";
import NavItemDetails from "./NavItemDetails";
import { NAV_ITEMS } from "../../../config/config";
import SvgIcon from "@material-ui/core/SvgIcon";
import Auth from "../../Auth/Auth";
import Spinner from "../../../UI/Spinner/Spinner2";
import { useSelector } from "react-redux";

const NavItem = ({ item, isLast, isBeforeLast }) => {
  const router = useRouter();
  const path = `/${item}`;
  const [showDetails, setShowDetails] = useState(false);
  const { email, userName, userFamilyName, userPicture } = useSelector(
    state => state.auth
  );
  

  const profileImg = userPicture ? userPicture : null;
  console.log(profileImg);
  return (
    <li
      className={`${styles.item} ${
        router.pathname === path ? styles.active : ""
      } ${item === "logout" ? styles.red : ""}`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {item !== "login" && item !== "loading" ? (
        <Link href={path}>
          {item === "profile" && profileImg ? (
            <img src={profileImg} alt={userName} width="25" height="25" />
          ) : (
            <SvgIcon viewBox="0 0 23 23">{NAV_ITEMS[item].svg}</SvgIcon>
          )}
        </Link>
      ) : item !== "loading" ? (
        <Auth />
      ) : (
        <Spinner />
      )}
      {showDetails && window.innerWidth > 400 && (
        <NavItemDetails
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
          show
          name={NAV_ITEMS[item].name}
          isLast={isLast}
          content={
            item === "logout" || item === "profile"
              ? { userName, userFamilyName, email,profileImg }
              : null
          }
          isBeforeLast={isBeforeLast}
        />
      )}
    </li>
  );
};

export default NavItem;
