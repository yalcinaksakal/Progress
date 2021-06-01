import Link from "next/link";
import styles from "./PageNav.module.css";
const PageNav = ({ items }) => {
  return (
    <div className={styles.pageNav}>
      <ul>
        {items.map(item => (
          <li key={item}>
            <Link href="/">{item}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PageNav;
