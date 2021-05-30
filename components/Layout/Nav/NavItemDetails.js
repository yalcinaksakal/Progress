import { NAV_ITEMS } from "../../../config/config";
import styles from "./NavItemDetails.module.css";

const NavItemDetails = props => {
  const leftShift = props.isLast ? 0 : props.isBeforeLast ? 40 : 60;

  return (
    <div className={styles.navItemDetail} style={{ "--left": leftShift }}>
      {props.name === "Profile" && (
        <>
          {props.content.profileImg ? (
            <img
              src={props.content.profileImg}
              alt={props.content.userName}
              width="50"
              height="50"
            />
          ) : (
            <svg viewBox="0 0 25 25">
              {NAV_ITEMS[props.name.toLowerCase()].svg}
            </svg>
          )}
          <br />
        </>
      )}
      {props.name}
      {props.content ? (
        <div className={styles.content}>
          {props.name === "Profile" && (
            <p>{`${props.content.userName} ${props.content.userFamilyName}`}</p>
          )}
          <p>{`${props.content?.email || props.content}`}</p>
        </div>
      ) : (
        <>
          <div>Test</div>
          <div>Test</div>
          <div>Test</div>
          <div>Test</div>
          <div>Test</div>
        </>
      )}
    </div>
  );
};

export default NavItemDetails;
