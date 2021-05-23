import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./NavItem.module.css";
import AuthGoogle from "../../Auth/AuthGoogle";

const NavItem = props => {
  const router = useRouter();
  const path = `/${props.name.toLowerCase()}`;
  return (
    <>
      <li
        className={`${styles.item} ${
          router.pathname === path ? styles.active : ""
        }`}
        onMouseEnter={() => props.onHover(true, props.name)}
        onMouseLeave={() => props.onHover(false)}
      >
        <Link href={path}>{props.icon}</Link>
      </li>
    </>
  );
};

export default NavItem;
