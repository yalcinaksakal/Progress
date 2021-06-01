import { useDispatch } from "react-redux";
import useFetch from "../../hooks/use-fetch";
import { loginActions } from "../../store/auth/google-slice";
import { authActions } from "../../store/auth/auth-slice";
import { setCookie } from "../../lib/helper";
import Google from "./Google";

const Auth = () => {
  const { sendRequest: fetchLoginData } = useFetch();
  const dispatch = useDispatch();
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
          status: `Hi ${loginData.given_name.toUpperCase()}. Please click Checkbox and Confirm then sign up to Progress.`,
        })
      );
      dispatch(authActions.setToken(response.tokenObj.id_token));
      return;
    }

    //SUCCESS
    //i am not using token for logging in, in the redux state, trying to kepp token null there. so calling setcookie in login dispatch might not work. so i am calling it here, i am sure that have token value here, in layout.js i am facing same issue

    setCookie({
      token: response.tokenObj.id_token,
      email: loginData.email,
      id: loginData.id,
    });
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

  return (
    <Google
      loginStartHandler={loginStartHandler}
      responseHandler={responseGoogle}
    />
  );
};

export default Auth;
