import Layout from "../../components/Layout";
import Card from "../../components/Card";

import * as Styled from "./Home.styled";

function HomePage() {
  return (
    <Layout>
      <Card images={["/duck.jfif", "/duck-2.avif"]} index={0} />
      <Card images={["/duck-3.jpg", "/duck-4.jpg"]} index={1} />
    </Layout>
  );
}

export default HomePage;
