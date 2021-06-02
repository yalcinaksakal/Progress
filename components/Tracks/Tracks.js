import styles from "./Tracks.module.css";
const template = `Introduction
 About mentor
 About track
 Prequisites
Milestone 1: Title
 Subtitle
 Subtitle
Milestone 2: Title
 Subtitle
  Subsubtitle
...

Paste your track's curriculum here like above.
After each line there has to be a linebreak (Enter).
Number of spaces at the begining of line defines indent of title.`;
const Tracks = ({ content }) => {
  console.log(content);
  return (
    <section>
      {content}
      <textarea className={styles.text} placeholder={template}></textarea>
    </section>
  );
};
export default Tracks;
