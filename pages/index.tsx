import Layout from "components/common/Layout";
import Landing from "components/Landing";
import PublicList from "components/PublicList";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <Landing />
      <PublicList />
    </Layout>
  );
};

export default Home;
