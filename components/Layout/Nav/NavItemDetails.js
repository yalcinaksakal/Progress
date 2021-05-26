import styles from "./NavItemDetails.module.css";

const NavItemDetails = props => {
  const leftShift = props.isLast ? 0 : props.isBeforeLast ? 50 : 60;
  return (
    <div className={styles.navItemDetail} style={{ "--left": leftShift }}>
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
