import Auth from "../../components/Auth/Auth";
import styles from "./Login.module.css";
export default function Login() {
  return (
    <>
      <div className={styles.login}>
        <Auth></Auth>
        <p>Please sign in/up</p>
      </div>
    </>
  );
}
