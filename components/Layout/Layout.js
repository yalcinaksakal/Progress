import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetch from "../../hooks/use-fetch";
import { setCookie } from "../../lib/helper";

import { authActions } from "../../store/auth/auth-slice";
import { loginActions } from "../../store/auth/google-slice";
import Backdrop from "../../UI/BackDrop/Backdrop";
import BottomModal from "../../UI/Modal/BottomModal";
import Modal from "../../UI/Modal/Modal";
import NavList from "./Nav/NavList";

const Layout = props => {
  const { isLogin, status } = useSelector(state => state.login);
  const { token, isLoggedIn } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const { sendRequest: fetchLoginData } = useFetch();

  const [silentLogin, setSilentLogin] = useState({
    loading: false,
    result: {},
  });

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
    // sign up Success

    setCookie({ token, email: loginData.email, id: loginData.id });
    dispatch(
      authActions.login({
        token: null,
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
  };

  //  initiate silent login
  useEffect(async () => {
    const checkCookie = async () => {
      try {
        const result = await fetch("/api/is-logged-in");
        return await result.json();
      } catch (err) {
        return false;
      }
    };
    if (isLoggedIn) return;
    setSilentLogin({
      loading: true,
      result: {},
    });
    const isCookie = await checkCookie();

    setSilentLogin(
      isCookie
        ? { loading: false, result: { ...isCookie } }
        : { loading: false, result: {} }
    );
  }, []);

  //if signup modal or signing in/up spinner are not active, auto close modal
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

  //if slient login succeeds, set auth state as logged in
  useEffect(() => {
    dispatch(authActions.setLoading(silentLogin.loading));
    if (silentLogin.result.isUser && silentLogin.result.ok)
      dispatch(
        authActions.login({
          token: null,
          email: silentLogin.result.email,
          userName: silentLogin.result.given_name,
          userFamilyName: silentLogin.result.family_name,
          locale: silentLogin.result.locale,
          picture: silentLogin.result.picture,
        })
      );
  }, [silentLogin]);

  const [isCookieAccepted, setIsCookieAccepted] = useState(true);
  const setConsentCookieHandler = () => {
    localStorage.setItem(
      "progress_token_Cookies_Consent",
      JSON.stringify({ accepted: true })
    );
    setIsCookieAccepted(true);
  };

  //check cookies were consented by the user earlier,if not show bottomModal
  useEffect(() => {
    const consentData = JSON.parse(
      localStorage.getItem("progress_token_Cookies_Consent")
    );

    !consentData?.accepted && setIsCookieAccepted(false);
  }, []);
  return (
    <>
      <NavList />
      <main>{props.children}</main>
      {!isCookieAccepted && (
        <BottomModal setConsentCookieHandler={setConsentCookieHandler} />
      )}
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

export default React.memo(Layout);
