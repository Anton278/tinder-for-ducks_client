import styled from "styled-components";

export const Container = styled.div`
  height: calc(100vh - 56px);
  margin: 0 auto;
  max-width: ${({ theme }) => theme.breakpoints.xl};
  padding: 0 20px;

  @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
    max-width: ${({ theme }) => theme.breakpoints.lg};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    max-width: ${({ theme }) => theme.breakpoints.md};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    max-width: ${({ theme }) => theme.breakpoints.sm};
  }
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    max-width: ${({ theme }) => theme.breakpoints.sm};
  }
`;
