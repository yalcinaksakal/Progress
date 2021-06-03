import { template } from "../../config/config";
import Card from "../../UI/Card/Card";
import styles from "./Tracks.module.css";

const Mentoring = () => {
  return (
    <>
      <h3>Mentoring 3 tracks</h3>
      <Card>
        <p>Create new track</p>
      </Card>
      <textarea className={styles.text} placeholder={template}></textarea>
    </>
  );
};
export default Mentoring;
