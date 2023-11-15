import Header from "../Header";

import * as Styled from "./Layout.styled";

type LayoutProps = {
  children?: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <Styled.Container as="main" className="container">
        {children}
      </Styled.Container>
    </>
  );
}

export default Layout;
