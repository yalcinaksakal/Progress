import Link from "next/link";
import styles from "./PageNav.module.css";
const PageNav = ({ active, items, page, directionColumn }) => {
  return (
    <div
      className={`${styles.pageNav} ${directionColumn ? styles.column : ""}`}
    >
      <ul>
        {items.map(item => (
          <li
            key={item}
            className={active === item.toLowerCase() ? styles.active : ""}
          >
            <Link href={`/${page}#${item.toLowerCase()}`}>{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageNav;
