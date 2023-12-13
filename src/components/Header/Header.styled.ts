import styled from "styled-components";

import Navbar from "react-bootstrap/Navbar";

export const Logo = styled(Navbar.Brand)`
  @media (min-width: 0px) {
    display: none;
  }
  @media (min-width: 576px) {
    display: block;
  }
`;

export const MobileLogo = styled(Navbar.Brand)`
  @media (min-width: 0px) {
    display: block;
  }
  @media (min-width: 576px) {
    display: none;
  }
`;
