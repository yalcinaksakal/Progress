import Spinner from "../Spinner/Spinner";
import Terms from "../Terms.js/Terms";

import styles from "./Modal.module.css";

const Modal = ({ text, clicked, onConfirm }) => {
  const signUp = text.slice(0, 2) === "Hi";
  return (
    <div className={styles.Modal}>
      <p>{text}</p>
      {(text === "Signing in/up" || text === "Signing up") && <Spinner />}
      {text !== "Signing up" && (
        <div className={styles.buttonsDiv}>
          {signUp && <Terms onConfirm={onConfirm} />}
          <button className={styles.Button} onClick={clicked}>
            {text === "Signing in/up" || signUp ? "Cancel" : "OK"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Modal;
