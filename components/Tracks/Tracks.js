import { template } from "../../config/config";
import Mentoring from "./Mentoring";
import styles from "./Tracks.module.css";

const Tracks = ({ content }) => {
  console.log(content);
  return <section>{content === "mentoring" && <Mentoring />}</section>;
};
export default Tracks;
