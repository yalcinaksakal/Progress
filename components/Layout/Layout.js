import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginActions } from "../../store/auth/google-slice";
import Backdrop from "../../UI/BackDrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import NavList from "./Nav/NavList";

const Layout = props => {
  const { isLogin, status } = useSelector(state => state.login);
  const dispatch = useDispatch();

  const cancelLoginHandler = useCallback(() => {
    dispatch(loginActions.setState({ isLogin: false, status: "" }));
  }, [dispatch]);

  useEffect(() => {
    let timeout;
    if (isLogin && status !== "Signing in/up") {
      timeout = setTimeout(() => cancelLoginHandler(), 3000);
    }
    return () => clearTimeout(timeout);
  }, [isLogin, status, dispatch, cancelLoginHandler]);

  return (
    <>
      <NavList />
      <main>{props.children}</main>
      {isLogin && (
        <>
          <Backdrop />
          <Modal text={status} clicked={cancelLoginHandler} />
        </>
      )}
    </>
  );
};

export default Layout;
