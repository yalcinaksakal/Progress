import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";
import Backdrop from "../../UI/BackDrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import NavList from "./Nav/NavList";

const Layout = props => {
  const { loggingIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (loggingIn !== "Signing in/up") {
      setTimeout(() => dispatch(authActions.setLoggingIn("")), 3000);
    }
  }, [loggingIn, dispatch]);

  return (
    <>
      <NavList />
      <main>{props.children}</main>
      {loggingIn && (
        <>
          <Backdrop />
          <Modal text={loggingIn} />
        </>
      )}
    </>
  );
};

export default Layout;
