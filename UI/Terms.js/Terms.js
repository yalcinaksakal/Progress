import { useState } from "react";

import styles from "./Terms.module.css";

import { circle, check } from "../../config/config";
import TermsAndConditions from "./TermsAndCondition";

const Terms = ({ onConfirm }) => {
  const [checked, setChecked] = useState(false);
  const changeHandler = () => {
    setChecked(prev => !prev);
  };
  return (
    <>
      <div className={styles.checkBox}>
        <TermsAndConditions />
        <div onClick={changeHandler} className={styles.confirmation}>
          {checked ? (
            <svg style={{ fill: "green" }}>{check}</svg>
          ) : (
            <svg className={styles.notChecked}>{circle}</svg>
          )}
          <div>
            By clicking above checkbox, you agree to our terms and conditions.
          </div>
        </div>
      </div>
      <button
        className={styles.Confirm}
        onClick={onConfirm}
        disabled={!checked}
      >
        Confirm
      </button>
    </>
  );
};

export default Terms;
