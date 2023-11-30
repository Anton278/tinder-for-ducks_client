import styled from "styled-components";

// min-height = header + container margin
export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 96px);
`;

export const Title = styled.h2`
  margin-top: 0;
  text-align: center;
  margin-bottom: 40px;
`;
