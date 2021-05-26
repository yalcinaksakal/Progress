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

    if (!loginData.ok)
      dispatch(
        loginActions.setState({
          isLogin: true,
          status: "Authentication failed",
        })
      );
    console.log(loginData);
    console.log(token);
    // DDDDDDDDDDDDDDDDD
    ///login
    ///create login cookie
    ///use cookie to at first render to directly sign in
    //render nav as logged in
  };
//   {ok: true, result: {…}}
// ok: true
// result:
// at_hash: "RvE6o1Ma0OGLFLKYGD50mA"
// aud: "362034787777-3bv42p9qsdeohgvtce875alt5jvr5opb.apps.googleusercontent.com"
// azp: "362034787777-3bv42p9qsdeohgvtce875alt5jvr5opb.apps.googleusercontent.com"
// email: "hranarima@gmail.com"
// email_verified: true
// exp: 1621994995
// family_name: "hraniova"
// given_name: "marianna"
// iat: 1621991395
// isUser: true
// iss: "accounts.google.com"
// jti: "846b6b2a6bec9eb62ace92841db7a71c0eca0de5"
// locale: "tr"
// name: "marianna hraniova"
// picture: "https://lh

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
