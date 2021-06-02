import { useState } from "react";
import styles from "./TermsAndC.module.css";

import { arrowDown, arrowUp } from "../../config/config";
import { contract } from "../../config/contract";

const TermsAndConditions = () => {
  const [show, setShow] = useState(false);
  return (
    <div className={styles.contract}>
      <div className={styles.title}>
        <h5>Terms and Conditions</h5>

        {show ? (
          <svg width="25" height="25" onClick={() => setShow(prev => !prev)}>
            {arrowUp}
          </svg>
        ) : (
          <svg width="25" height="25" onClick={() => setShow(prev => !prev)}>
            {arrowDown}
          </svg>
        )}
      </div>
      {show && <textarea disabled value={contract}></textarea>}
    </div>
  );
};

export default TermsAndConditions;
