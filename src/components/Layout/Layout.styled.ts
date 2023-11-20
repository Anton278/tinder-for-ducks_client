import styled from "styled-components";
import BootstrapContainer from "react-bootstrap/Container";

export const Container = styled(BootstrapContainer)`
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  column-gap: 20px;
`;

export const ContentWrapper = styled.div`
  flex-grow: 1;
  position: relative;
  overflow-x: hidden;
  min-height: calc(100vh - 96px);
`;
