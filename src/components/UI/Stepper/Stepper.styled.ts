import styled from "styled-components";

export const Wrapper = styled.div`
  margin-bottom: 30px;
`;

export const Title = styled.h4`
  margin-bottom: 15px;
`;

export const Steps = styled.div`
  display: flex;
  align-items: center;
`;

export const Step = styled.button<{
  $active: boolean;
}>`
  position: relative;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  padding: 0;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? "var(--bs-info)" : "var(--bs-info-bg-subtle)"};
`;

export const Line = styled.div<{
  $active: boolean;
}>`
  border-bottom: 1px solid
    ${({ $active }) =>
      $active ? "var(--bs-info)" : "var(--bs-info-bg-subtle)"};
  flex-grow: 1;
`;
