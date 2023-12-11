import styled from "styled-components";
import Dropdown from "react-bootstrap/Dropdown";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const Top = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const TopLeft = styled.div`
  display: flex;
  align-items: center;

  div {
    margin-left: 20px;
  }
  p {
    margin: 0;
    margin-left: 10px;
  }
`;

export const DropdownToggle = styled(Dropdown.Toggle)`
  &::after {
    display: none;
  }
`;

export const Center = styled.section`
  flex-grow: 1;
  margin: 15px 0;
  // 100vh - (header height + content wrapper margin) - (chat top + chat body margin + chat bottom)
  max-height: calc(100vh - 96px - 161px);
  overflow-y: auto;
`;

export const Message = styled.div<{ $isOnRight: boolean }>`
  width: fit-content;
  margin-bottom: 10px;
  padding: 5px 10px;
  border-radius: 10px;
  background: var(--bs-success-bg-subtle);

  ${({ $isOnRight }) =>
    $isOnRight &&
    `
  margin-left: auto;
  background: var(--bs-warning-bg-subtle);
  `}
`;

export const Bottom = styled.section`
  display: flex;
  align-items: center;
  column-gap: 20px;
  padding-left: 4px;
  padding-bottom: 4px;
`;
