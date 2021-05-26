import styles from "./NavItemDetails.module.css";

const NavItemDetails = props => {
  console.log(props.isLast);
  return (
    <div
      className={`${styles.navItemDetail} ${
        props.isLast
          ? styles.lastItems
          : props.isBeforeLast
          ? styles.beforeLast
          : styles.firstItems
      }`}
    >
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
