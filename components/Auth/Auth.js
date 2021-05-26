import { useDispatch } from "react-redux";
import useFetch from "../../hooks/use-fetch";
import { loginActions } from "../../store/auth/google-slice";
import { authActions } from "../../store/auth/auth-slice";

import Google from "./Google";

const Auth = () => {
  const { sendRequest: fetchLoginData } = useFetch();
  const dispatch = useDispatch();
  const loginHandler = (
    token,
    expirationTime,
    userName,
    loginType = "google"
  ) => {
    dispatch(
      authActions.login({
        token,
        expirationTime,
        userName,
        loginType,
      })
    );
    // dispatch(setLogoutTimer(calculateRemainingTime(expirationTime)));
  };
  const loginFailHandler = () => {
    dispatch(loginActions.setState({ isLogin: true, status: "Login failed" }));
  };
  const loginStartHandler = () => {
    dispatch(loginActions.setState({ isLogin: true, status: "Signing in/up" }));
  };
  const responseGoogle = async response => {
    if (response.error) {
      // setError("Authentication failed");
      // console.log(response);
      // setError(response.error.replace(/_/g, " "));

      loginFailHandler();
      return;
    }
    loginStartHandler();
    const loginData = await fetchLoginData({
      token: response.tokenObj.id_token,
      type: "login",
    });

    if (!loginData.ok) {
      loginFailHandler();
      return;
    }
    if (!loginData.isUser) {
      dispatch(
        loginActions.setState({
          isLogin: true,
          status: `Hi ${loginData.given_name.toUpperCase()}. Please click Confirm and then sign up to Progress.`,
        })
      );
      dispatch(authActions.setToken(response.tokenObj.id_token));
      return;
    }

    //SUCCESS
    console.log(loginData);
    dispatch(
      loginActions.setState({
        isLogin: true,
        status: `Welcome ${loginData.given_name.toUpperCase()}`,
      })
    );
    console.log(response.tokenObj.id_token);

    // eyJhbGciOiJSUzI1NiIsImtpZCI6ImNkNDliMmFiMTZlMWU5YTQ5NmM4MjM5ZGFjMGRhZGQwOWQ0NDMwMTIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiMzYyMDM0Nzg3Nzc3LTNidjQycDlxc2Rlb2hndnRjZTg3NWFsdDVqdnI1b3BiLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiMzYyMDM0Nzg3Nzc3LTNidjQycDlxc2Rlb2hndnRjZTg3NWFsdDVqdnI1b3BiLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTAwNDIwMDU2NzUyNDU5Mjk5NDQ5IiwiZW1haWwiOiJocmFuYXJpbWFAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF0X2hhc2giOiJLYU41Yjlyb1RXMFBNZWN1ZG9mR0NBIiwibmFtZSI6Im1hcmlhbm5hIGhyYW5pb3ZhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FBVFhBSnl3STFGM3RjMVM0eWZSckZoMTQ0ZXNSdW9ZaU9fMmtHMGtYQTN2PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6Im1hcmlhbm5hIiwiZmFtaWx5X25hbWUiOiJocmFuaW92YSIsImxvY2FsZSI6InRyIiwiaWF0IjoxNjIxOTkxNzgxLCJleHAiOjE2MjE5OTUzODEsImp0aSI6IjVhMjhiZGRlNDIxZjIzYzRmY2ZiMmFkYzY3YjM0NGZmYjk2ODhhOWMifQ.hxHzogLlaILp9fawN6Y2AvZKZB-shoEO5DTV3b_nutR163M2Mn89tN2v5mSVjIoMFRL-OXMpRnI0CqSmG0Y-M4Tm78XTIooYbnza7LvdzdS7MbpOhGFGG8DaJB5Es-1DT9cz2hue6vBuHzqISw3W9_6z-K8yuK8WjreUloM4spPnTryLUg5OzoA6rLmkRQFFpNlBpcE3HhH5SL0in6zwN2wm1pRH-IP4EXqL8JFxB1Uw7qrS6hDN2E9LEafa_fA8-WvNZ5ud-tFGSn-T9Y2lu0s9jnxoeQN7e3Ll_D_7e68OJSjC79jqujK9aIWmOGGl-ex3gcoK2cDXQc3wzcL2KQ

    // const expiresIn = +response.tokenObj.expires_in;
    // //fix 120 seconds to logout, if u want logout according to Firebase expiresIn time, use it instead of 120 below
    // const expirationTime = new Date(
    //   new Date().getTime() + 120 * 1000
    // ).toISOString();

    // loginHandler(
    //   response.tokenObj,
    //   expirationTime,
    //   response.profileObj.name,
    //   response.profileObj.imageUrl,
    //   "google"
    // );
    // dispatch(
    //   authActions.setSignIn({
    //     isLoggingIn: true,
    //     status: `Wellcome ${response.profileObj.name}`,
    //   })
    // );
  };

  return (
    <Google
      loginStartHandler={loginStartHandler}
      responseHandler={responseGoogle}
    />
  );
};

export default Auth;
