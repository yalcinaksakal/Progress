import GoogleLogin from "react-google-login";
import { CLIENT_ID } from "../../config/config";

const Google = ({ loginStartHandler, responseHandler }) => {
  return (
    <div onClick={loginStartHandler}>
      <GoogleLogin
        render={renderProps => (
          <i
            onClick={() => {
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
        buttonText="Sign in/up"
        onSuccess={responseHandler}
        onFailure={responseHandler}
        cookiePolicy="single_host_origin"
      />
    </div>
  );
};

export default Google;
