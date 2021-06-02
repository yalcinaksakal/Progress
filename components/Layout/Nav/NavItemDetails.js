import { NAV_ITEMS } from "../../../config/config";
import PageNav from "../PageNav/PageNav";
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
              alt="p"
              width="50"
              height="50"
            />
          ) : (
            <svg width="25" height="25" viewBox="0 0 25 25">
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
      ) : props.name === "My Tracks" ? (
        <PageNav
          directionColumn
          page="tracks"
          items={["Progressing", "Mentoring", "Completed"]}
        />
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
