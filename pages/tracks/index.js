import PageNav from "../../components/Layout/PageNav/PageNav";

const TracksPage = () => {
  return (
    <>
      <PageNav
        page="tracks"
        items={["Progressing", "Mentoring", "Completed"]}
      />
      <section>Tracks </section>;
    </>
  );
};

export default TracksPage;
