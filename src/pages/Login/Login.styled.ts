import styled from "styled-components";

// min-height = header + container margin
export const Wrapper = styled.div`
  min-height: calc(100vh - 96px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 40px;
`;

export const Error = styled.p`
  margin-top: 20px;
  text-align: center;
`;
