import { useState } from "react";

import styles from "./Terms.module.css";

const Terms = ({ onConfirm }) => {
  const [checked, setChecked] = useState(true);
  const changeHandler = () => {
    setChecked(prev => !prev);
  };
  return (
    <>
      <label className={styles.checkBox}>
        <input type="checkbox" checked={checked} onChange={changeHandler} />
        By signing up, you agree to our terms and conditions.
      </label>
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
