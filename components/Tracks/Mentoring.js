import { useEffect, useRef } from "react";
import { template } from "../../config/config";
// import createPath from "../../lib/tree";
import Card from "../../UI/Card/Card";
import styles from "./Tracks.module.css";

const Mentoring = () => {
  const textAreaRef = useRef();

  const textHandler = () => {
    console.log(textAreaRef.current.value);
    // const path = createPath(textAreaRef.current.value);
    // console.log(path);
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
