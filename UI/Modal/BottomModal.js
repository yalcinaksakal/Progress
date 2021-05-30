import styles from "./BottomModal.module.css";

const BottomModal = ({ setConsentCookieHandler }) => {
  return (
    <div className={styles.Modal}>
      <p>Cookie consent message</p>

      <button
        className={`${styles.Button} ${styles.green}`}
        onClick={setConsentCookieHandler}
      >
        Consent
      </button>
    </div>
  );
};

export default BottomModal;
