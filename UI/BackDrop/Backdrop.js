import styles from "./Backdrop.module.css";

const Backdrop = props => (
  <div onClick={props.clicked} className={styles.Backdrop}></div>
);

export default Backdrop;
