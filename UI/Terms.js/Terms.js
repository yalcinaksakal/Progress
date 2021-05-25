import { useState } from "react";

import styles from "./Terms.module.css";
import SvgIcon from "@material-ui/core/SvgIcon";
import { circle, check } from "../../config/config";
import TermsAndConditions from "./TermsAndCondition";

const mySvgCheck = <SvgIcon>{check}</SvgIcon>;

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
            <SvgIcon style={{ color: "green" }}>{check}</SvgIcon>
          ) : (
            <SvgIcon className={styles.notChecked}>{circle}</SvgIcon>
          )}
          <div>By clicking above checkbox, you agree to our terms and conditions.</div>
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
