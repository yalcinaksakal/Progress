import { useState } from "react";

import styles from "./Terms.module.css";
import SvgIcon from "@material-ui/core/SvgIcon";
import { circle, check } from "../../config/config";

const mySvgCheck = <SvgIcon>{check}</SvgIcon>;

const Terms = ({ onConfirm }) => {
  const [checked, setChecked] = useState(true);
  const changeHandler = () => {
    setChecked(prev => !prev);
  };
  return (
    <>
      <div className={styles.checkBox} onClick={changeHandler}>
        {checked ? (
          <SvgIcon style={{ color: "green" }}>{check}</SvgIcon>
        ) : (
          <SvgIcon style={{ color: "red" }}>{circle}</SvgIcon>
        )}
        <div>By signing up, you agree to our terms and conditions.</div>
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
