import { cross } from "../../config/config";

import Login from "../Login/Login";
const LoginReq = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "6rem",
          marginTop: "1rem",
          width: "100%",
          alignItems: "center",
        }}
      >
        <Login />
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "50vh",
        }}
      >
        <svg fill="salmon" width="40" height="40" viewBox="0 0 18 18">
          {cross}
        </svg>
        <p style={{ marginLeft: "1rem" }}>Sign in required!</p>
      </div>
    </>
  );
};
export default LoginReq;
