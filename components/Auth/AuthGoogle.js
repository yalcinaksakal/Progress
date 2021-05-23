import { useRef, useState } from "react";
import { useRouter } from "next/router";

// import classes from "./AuthForm.module.css";
import useFetch from "../../hooks/use-fetch";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth-slice";
import { setLogoutTimer } from "../../store/auth-actions";
import { calculateRemainingTime } from "../../lib/helper";
import GoogleLogin from "react-google-login";

const AuthGoogle = () => {
  const { isLoading, sendRequest: fetchLoginData } = useFetch();
  const [error, setError] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [successMsg, setSuccessMsg] = useState(null);
  const [showPwd, setShowPwd] = useState(false);
  const emailRef = useRef();
  const pwdRef = useRef();
  const dispatch = useDispatch();
  const router = useRouter();

  const showPwdHandler = () => {
    setShowPwd(prevState => !prevState);
  };

  const loginHandler = (
    token,
    expirationTime,
    userName,
    loginType = "user"
  ) => {
    dispatch(
      authActions.login({
        token,
        expirationTime,
        userName,
        loginType,
      })
    );
    dispatch(setLogoutTimer(calculateRemainingTime(expirationTime)));
    router.replace("/");
  };

  const responseGoogle = response => {
    if (response.error) {
      // setError("Authentication failed");
      console.log(response);
      setError(response.error.replace(/_/g, " "));
      return;
    }
    // https://auth-next-rose.vercel.app

    const expiresIn = +response.tokenObj.expires_in;
    //fix 120 seconds to logout, if u want logout according to Firebase expiresIn time, use it instead of 120 below
    const expirationTime = new Date(
      new Date().getTime() + 120 * 1000
    ).toISOString();
    loginHandler(
      response.tokenId,
      expirationTime,
      response.profileObj.name,
      "google"
    );
  };

  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
    setError(false);
    emailRef.current.value = "";
    pwdRef.current.value = "";
    setShowPwd(false);
  };

  const submitHandler = async event => {
    event.preventDefault();
    setError(false);
    const enteredEmail = emailRef.current.value;
    const enteredPwd = pwdRef.current.value;
    const loginData = await fetchLoginData({
      email: enteredEmail,
      password: enteredPwd,
      isLogin,
    });
    if (!loginData.ok) {
      setError(loginData.error);
      return;
    }
    if (!isLogin) {
      setSuccessMsg(loginData.result);
      setTimeout(() => {
        setSuccessMsg(null);
        setIsLogin(true);
      }, 2000);
      return;
    }

    loginHandler(
      loginData.idToken,
      loginData.expirationTime,
      enteredEmail.split("@")[0]
    );
  };

  return (
    <GoogleLogin
      render={renderProps => (
        <i
          // className={classes.gbutton}
          onClick={() => {
            setError(false);
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
      clientId="736076693286-m98km6smat5d0rb7q58fi19ae9os0trp.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
    />
  );
};

export default AuthGoogle;
