import PageNav from "../../components/Layout/PageNav/PageNav";
import { useRouter } from "next/router";
import Tracks from "../../components/Tracks/Tracks";
const TracksPage = () => {
  let pathHash = useRouter().asPath.split("#")[1];
  if (!pathHash) pathHash = "progressing";
  return (
    <>
      <PageNav
        active={pathHash}
        page="tracks"
        items={["Progressing", "Mentoring", "Completed"]}
      />
      <Tracks content={pathHash} />
    </>
  );
};

export default TracksPage;
