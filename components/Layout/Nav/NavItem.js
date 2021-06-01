import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./NavItem.module.css";
import { useState } from "react";
import NavItemDetails from "./NavItemDetails";
import { NAV_ITEMS } from "../../../config/config";

import Auth from "../../Auth/Auth";
import Spinner from "../../../UI/Spinner/Spinner2";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../../store/auth/auth-slice";

const NavItem = ({ item, isLast, isBeforeLast }) => {
  const dispatch = useDispatch();
  const { pathname } = useRouter();
  const path = `/${item}`;
  const isPageActive = pathname === path;
  const [showDetails, setShowDetails] = useState(false);
  const { email, userName, userFamilyName, userPicture } = useSelector(
    state => state.auth
  );

  const profileImg = userPicture ? userPicture : null;

  return (
    <li
      className={`${styles.item} ${isPageActive ? styles.active : ""} ${
        item === "logout" ? styles.red : ""
      }`}
      onMouseEnter={() => setShowDetails(true)}
      onMouseLeave={() => setShowDetails(false)}
    >
      {item !== "login" && item !== "loading" && item !== "logout" ? (
        <Link href={path}>
          {item === "profile" && profileImg ? (
            <img src={profileImg} alt="p" width="26" height="26" />
          ) : (
            <svg width="25" height="25" viewBox="0 0 25 25">
              {NAV_ITEMS[item].svg}
            </svg>
          )}
        </Link>
      ) : item !== "loading" && item !== "logout" ? (
        <Auth />
      ) : item === "loading" ? (
        <Spinner />
      ) : (
        // Logout
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          onClick={() => dispatch(authActions.logout())}
        >
          {NAV_ITEMS[item].svg}
        </svg>
      )}
      {showDetails && window.innerWidth > 400 && (
        // !isPageActive &&
        <NavItemDetails
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
          show
          name={NAV_ITEMS[item].name}
          isLast={isLast}
          content={
            item === "logout" || item === "profile"
              ? { userName, userFamilyName, email, profileImg }
              : item === "login"
              ? "Sign In or Sign Up with your google account. "
              : null
          }
          isBeforeLast={isBeforeLast}
        />
      )}
    </li>
  );
};

export default NavItem;
