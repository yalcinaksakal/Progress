import { useDispatch } from "react-redux";
import useFetch from "../../hooks/use-fetch";
import { loginActions } from "../../store/auth/google-slice";
import { authActions } from "../../store/auth/auth-slice";
import Backdrop from "../../UI/BackDrop/Backdrop";
import Modal from "../../UI/Modal/Modal";
import Google from "./Google";
import { useEffect, useState } from "react";

const Auth = () => {
  const { sendRequest: fetchLoginData } = useFetch();
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);
  const [status, setStatus] = useState("");
  const [token, setToken] = useState(null);

  const loginFailHandler = () => {
    setIsLogin(true);
    setStatus("Login failed");
    setToken(null);
  };
  const loginStartHandler = () => {
    setIsLogin(true);
    setStatus("Signing in/up");
  };
  const responseGoogle = async response => {
    if (response.error) {
      loginFailHandler();
      return;
    }
    setToken(response.tokenObj?.id_token);
    // loginStartHandler();

    const loginData = await fetchLoginData({
      token,
      type: "login",
    });

    if (!loginData.ok) {
      loginFailHandler();
      return;
    }
    if (!loginData.isUser) {
      setIsLogin(true);
      setStatus(
        `Hi ${loginData.given_name.toUpperCase()}. Please click Checkbox and Confirm button, then you will be signed up to Progress.`
      );
      return;
    }

    //SUCCESS

    dispatch(
      loginActions.setState({
        isLogin: true,
        status: `Welcome ${loginData.given_name.toUpperCase()}`,
      })
    );

    dispatch(
      authActions.login({
        token: response.tokenObj.id_token,
        email: loginData.email,
        userName: loginData.given_name,
        userFamilyName: loginData.family_name,
        locale: loginData.locale,
        picture: loginData.picture,
      })
    );
  };

  const cancelLoginHandler = () => {
    setIsLogin(false);
    setStatus("");
    setToken(null);
  };

  const confirmSignUpHandler = async () => {
    setIsLogin(true);
    setStatus("Signing up");

    const loginData = await fetchLoginData({
      token,
      type: "signup",
    });

    if (!loginData.ok) {
      setStatus("Authentication failed");
      setToken(null);
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
    setStatus(`Welcome ${loginData.given_name.toUpperCase()}`);
    console.log(loginData);
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
      <Google
        loginStartHandler={loginStartHandler}
        responseHandler={responseGoogle}
      />
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

export default Auth;
