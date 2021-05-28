import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/use-fetch";

import { authActions } from "../../store/auth/auth-slice";
import { loginActions } from "../../store/auth/google-slice";
import Backdrop from "../../UI/BackDrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import NavList from "./Nav/NavList";

const Layout = props => {
  const { isLogin, status } = useSelector(state => state.login);
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { sendRequest: fetchLoginData } = useFetch();

  const cancelLoginHandler = useCallback(() => {
    dispatch(loginActions.setState({ isLogin: false, status: "" }));
    dispatch(authActions.setToken(null));
  }, [dispatch]);

  const confirmSignUpHandler = async () => {
    dispatch(loginActions.setState({ isLogin: true, status: "Signing up" }));

    const loginData = await fetchLoginData({
      token: token,
      type: "signup",
    });

    if (!loginData.ok) {
      dispatch(
        loginActions.setState({
          isLogin: true,
          status: "Authentication failed",
        })
      );
      return;
    }

    dispatch(
      authActions.login({
        token,
        email: loginData.email,
        userName: loginData.given_name,
        userFamilyName: loginData.family_name,
        locale: loginData.locale,
        picture: loginData.picture,
      })
    );

    dispatch(
      loginActions.setState({
        isLogin: true,
        status: `Welcome ${loginData.given_name.toUpperCase()}`,
      })
    );

    // DDDDDDDDDDDDDDDDD
    ///login
    ///create login cookie
    ///use cookie to  directly sign in at first render
    //render nav as logged in
  };

  useEffect(() => {
    let timeout;
    if (
      isLogin &&
      status.slice(0, 7) !== "Signing" &&
      status.slice(0, 2) !== "Hi"
    ) {
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
          <Modal
            text={status}
            clicked={cancelLoginHandler}
            onConfirm={confirmSignUpHandler}
          />
        </>
      )}
    </>
  );
};

export default Layout;
