import styles from "./NavItemDetails.module.css";

const NavItemDetails = props => {
  console.log(props);
  return <div className={styles.navItemDetail}>{props.name}</div>;
};

export default NavItemDetails;
