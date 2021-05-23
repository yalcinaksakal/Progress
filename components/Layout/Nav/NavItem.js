import { useRouter } from "next/router";
import Link from "next/link";
import styles from "./NavItem.module.css";
const NavItem = props => {
  const router = useRouter();
  const path = `/${props.name.toLowerCase()}`;
  return (
    <li
      className={`${styles.item} ${
        router.pathname === path ? styles.active : ""
      }`}
      title={props.name}
    >
      <Link href={path}>{props.icon}</Link>
    </li>
  );
};

export default NavItem;
{
  /* <li className={router.pathname === "/profile" ? classes.active : ""}>
<Link href="/profile">Profile</Link>
</li> */
}
