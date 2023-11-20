import { Link } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import Bell from "../Icons/Bell";
import Heart from "../Icons/Heart";
import Chat from "../Icons/Chat";
import Gear from "../Icons/Gear";
import Home from "../Icons/Home";

import * as Styled from "./Aside.styled";

function Aside() {
  return (
    <aside>
      <ListGroup defaultActiveKey="#link1">
        <Styled.ListGroupItem action as={Link} to="/">
          <div>
            <Home />
            Home
          </div>
        </Styled.ListGroupItem>
        <Styled.ListGroupItem action as={Link} to="#">
          <div>
            <Bell />
            Notifications
          </div>
          <Badge bg="primary">1</Badge>
        </Styled.ListGroupItem>
        <Styled.ListGroupItem action as={Link} to="#">
          <div>
            <Heart />
            Matchs
          </div>
          <Badge bg="primary">1</Badge>
        </Styled.ListGroupItem>
        <Styled.ListGroupItem action as={Link} to="#">
          <div>
            <Chat />
            Chats
          </div>
          <Badge bg="primary">2</Badge>
        </Styled.ListGroupItem>
        <Styled.ListGroupItem action as={Link} to="#">
          <div>
            <Heart />
            Liked
          </div>
        </Styled.ListGroupItem>
        <Styled.ListGroupItem action as={Link} to="#">
          <div>
            <Gear />
            Settings
          </div>
        </Styled.ListGroupItem>
      </ListGroup>
    </aside>
  );
}

export default Aside;
