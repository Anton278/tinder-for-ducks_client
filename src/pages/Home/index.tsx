import Layout from "../../components/Layout";
import Card from "../../components/Card";

import * as Styled from "./Home.styled";

function HomePage() {
  return (
    <Layout>
      <Styled.Inner>
        <Styled.CardsWrapper>
          <Card images={["/duck.jfif", "/duck-2.avif"]} index={0} />
          <Card images={["/duck-3.jpg", "/duck-4.jpg"]} index={1} />
        </Styled.CardsWrapper>
      </Styled.Inner>
    </Layout>
  );
}

export default HomePage;
