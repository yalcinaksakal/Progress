import React from "react";
import Spinner from "../Spinner/Spinner";

import styles from "./Modal.module.css";

const Modal = ({ text, clicked }) => {
  const signUp = text.slice(0, 2) === "Hi";
  return (
    <div className={styles.Modal}>
      <p>{text}</p>
      {text === "Signing in/up" && <Spinner />}
      <div className={styles.buttonsDiv}>
        {signUp && <button className={styles.Confirm}>Confirm</button>}
        <button className={styles.Button} onClick={clicked}>
          {text === "Signing in/up" || signUp ? "Cancel" : "OK"}
        </button>
      </div>
    </div>
  );
};

export default Modal;
