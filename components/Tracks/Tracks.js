import { template } from "../../config/config";
import styles from "./Tracks.module.css";

const Tracks = ({ content }) => {
  console.log(content);
  return (
    <section>
      {content}
      {content === "mentoring" && (
        <textarea className={styles.text} placeholder={template}></textarea>
      )}
    </section>
  );
};
export default Tracks;
