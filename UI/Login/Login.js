import Auth from "../../components/Auth/Auth";
import styles from "./Login.module.css";
export default function Login() {
  return (
    <div className={styles.login}>
      <Auth />
      <p>Sign in/up</p>
    </div>
  );
}
