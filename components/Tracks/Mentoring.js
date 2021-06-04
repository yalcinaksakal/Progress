import { useRef } from "react";
import { template } from "../../config/config";
import createPath from "../../lib/tree";
import Card from "../../UI/Card/Card";
import styles from "./Tracks.module.css";

const Mentoring = () => {
  const textAreaRef = useRef();

  const textHandler = () => {
    const track = createPath(textAreaRef.current.value);
    if (!track.ok) {
      console.log(track.errorLine);
      return;
    }
    console.log(track.path.print());
  };

  return (
    <>
      <h3>Mentoring 3 tracks</h3>
      <Card>
        <p>Create new track</p>
      </Card>
      <textarea
        onClick={textHandler}
        ref={textAreaRef}
        className={styles.text}
        placeholder={template}
      ></textarea>
    </>
  );
};
export default Mentoring;
