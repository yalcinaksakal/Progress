import { useSelector } from "react-redux";

import classes from "./UserProfile.module.css";

const UserProfile = () => {
  const { email, userName } = useSelector(state => state.auth);

  return (
    <section className={classes.profile}>
      {email ? (
        <>
          <h1>{userName}</h1>
          <p>{email}</p>
          <p>You used your Google account to sign in.</p>
        </>
      ) : (
        <h3>Please sign in to view this page.</h3>
      )}
    </section>
  );
};

export default UserProfile;
