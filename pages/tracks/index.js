import { useSelector } from "react-redux";
import PageNav from "../../components/Layout/PageNav/PageNav";
import { useRouter } from "next/router";
import Tracks from "../../components/Tracks/Tracks";
import LoginReq from "../../UI/LoginReq/LoginReq";
const TracksPage = () => {
  const { isLoggedIn } = useSelector(state => state.auth);
  let pathHash = useRouter().asPath.split("#")[1];
  if (!pathHash) pathHash = "progressing";
  return isLoggedIn ? (
    <>
      <PageNav
        active={pathHash}
        page="tracks"
        items={["Progressing", "Mentoring", "Completed"]}
      />
      <Tracks content={pathHash} />
    </>
  ) : (
    <LoginReq />
  );
};

export default TracksPage;
