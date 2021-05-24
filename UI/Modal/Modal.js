import React from "react";

import styles from "./Modal.module.css";

const Modal = props => {
  return (
    <div className={styles.Modal}>
      <p>{props.text}</p>
      <button className={styles.Button} onClick={props.closed}>
        {props.text === "Signing in/up" ? "Cancel" : "OK"}
      </button>
    </div>
  );
};

export default Modal;
