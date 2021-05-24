import React from "react";
import Spinner from "../Spinner/Spinner";

import styles from "./Modal.module.css";

const Modal = props => {
  return (
    <div className={styles.Modal}>
      <h2>{props.text}</h2>
      {props.text === "Signing in/up" && <Spinner />}
      <button className={styles.Button} onClick={props.clicked}>
        {props.text === "Signing in/up" ? "Cancel" : "OK"}
      </button>
    </div>
  );
};

export default Modal;
