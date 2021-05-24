import { useState } from "react";

import useFetch from "../../hooks/use-fetch";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
// import { setLogoutTimer } from "../../store/auth-actions";
// import { calculateRemainingTime } from "../../lib/helper";
import GoogleLogin from "react-google-login";
import { CLIENT_ID } from "../../config/config";

const AuthGoogle = () => {
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

  const responseGoogle = async response => {
    if (response.error) {
      // setError("Authentication failed");
      // console.log(response);
      // setError(response.error.replace(/_/g, " "));
      dispatch(authActions.setLoggingIn("Sign in/up failed"));
      return;
    }
    const loginData = await fetchLoginData({
      token: response.tokenObj.id_token,
      type: "login",
    });
    console.log(response);
    const expiresIn = +response.tokenObj.expires_in;
    //fix 120 seconds to logout, if u want logout according to Firebase expiresIn time, use it instead of 120 below
    const expirationTime = new Date(
      new Date().getTime() + 120 * 1000
    ).toISOString();

    loginHandler(
      response.tokenObj,
      expirationTime,
      response.profileObj.name,
      response.profileObj.imageUrl,
      "google"
    );
    dispatch(authActions.setLoggingIn("Wellcome"));
  };

  return (
    <>
      <GoogleLogin
        render={renderProps => (
          <i
            // className={classes.gbutton}
            onClick={() => {
              // setError(false);
              dispatch(authActions.setLoggingIn("Signing in/up"));
              renderProps.onClick();
            }}
            className="fab fa-google"
            style={{
              background: "transparent",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginLeft: "3px", fontSize: "10px" }}>
              Sign in/up
            </span>
          </i>
        )}
        clientId={CLIENT_ID}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
      />
    </>
  );
};

export default AuthGoogle;
