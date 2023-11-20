import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";

export const ListGroupItem = styled(ListGroup.Item).attrs({
  className: "list-group-item list-group-item-action",
})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 20px;

  svg {
    margin-right: 10px;
  }
`;
