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
