import { PowerInputSharp } from "@material-ui/icons";
import styles from "./NavItemDetails.module.css";

const NavItemDetails = props => {
  const leftShift = props.isLast ? 0 : props.isBeforeLast ? 40 : 60;

  return (
    <div className={styles.navItemDetail} style={{ "--left": leftShift }}>
      {props.name === "Profile" && (
        <>
          <img
            src={props.content.profileImg}
            alt={props.content.userName}
            width="50"
            height="50"
          />
          <br />
        </>
      )}
      {props.name}
      {props.content ? (
        <div className={styles.content}>
          {props.name === "Profile" && (
            <p>{`${props.content.userName} ${props.content.userFamilyName}`}</p>
          )}
          <p>{`${props.content.email}`}</p>
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
