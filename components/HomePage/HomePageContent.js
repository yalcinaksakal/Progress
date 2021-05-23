import { useSelector } from "react-redux";

import classes from "./HomePageContent.module.css";

const HomePageContent = () => {
  const { isLoggedIn, userName } = useSelector(state => state.auth);
  return (
    <section className={classes.starting}>
      <p>Hello {userName}</p>
      <h1>{isLoggedIn ? "Welcome on Board!" : "Please Login"}</h1>
    </section>
  );
};

export default HomePageContent;
