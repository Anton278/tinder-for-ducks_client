import Header from "../Header";
import Aside from "../Aside";
import { useAuth } from "../../stores/auth";

import * as Styled from "./Layout.styled";

type LayoutProps = {
  children?: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const isAuthed = useAuth((state) => state.isAuthed);

  return (
    <>
      <Header />
      <Styled.Container as="main" className="container">
        {isAuthed && <Aside />}
        <Styled.ContentWrapper>{children}</Styled.ContentWrapper>
      </Styled.Container>
    </>
  );
}

export default Layout;
