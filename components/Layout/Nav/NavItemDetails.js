import styles from "./NavItemDetails.module.css";

const NavItemDetails = props => {
  return (
    <div className={styles.navItemDetail}>
      {props.name}
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
      <div>Test</div>
    </div>
  );
};

export default NavItemDetails;
