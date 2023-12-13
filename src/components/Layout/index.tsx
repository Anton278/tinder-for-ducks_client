import Header from "../Header";
import Aside from "../Aside";
import { useUser } from "../../stores/user";

import * as Styled from "./Layout.styled";

type LayoutProps = {
  children?: React.ReactNode;
  contentWrapperStyles?: React.CSSProperties;
};

function Layout({ children, contentWrapperStyles }: LayoutProps) {
  const isAuthed = useUser((state) => state.isAuthed);

  return (
    <>
      <Header />
      <Styled.Container as="main" className="container">
        {isAuthed && <Aside />}
        <Styled.ContentWrapper style={contentWrapperStyles}>
          {children}
        </Styled.ContentWrapper>
      </Styled.Container>
    </>
  );
}

export default Layout;
