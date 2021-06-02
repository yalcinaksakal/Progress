import { cross } from "../../config/config";
import Card from "../Card/Card";
const LoginReq = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "40vh",
      }}
    >
      <svg fill="salmon" width="50" height="50" viewBox="0 0 18 18">
        {cross}
      </svg>
      <p style={{ marginLeft: "1rem" }}> Please login to view this page</p>
    </div>
  );
};
export default LoginReq;
