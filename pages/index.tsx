import Layout from "components/common/Layout";
import Landing from "components/Landing";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <Layout>
      <Landing />
    </Layout>
  );
};

export default Home;
