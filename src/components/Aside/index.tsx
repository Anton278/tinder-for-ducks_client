import { NavLink } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import Badge from "react-bootstrap/Badge";

import Bell from "../Icons/Bell";
import Heart from "../Icons/Heart";
import Chat from "../Icons/Chat";
import Gear from "../Icons/Gear";
import Home from "../Icons/Home";

import * as Styled from "./Aside.styled";
import { useUser } from "../../stores/user";

function Aside() {
  const newNotifications = useUser((state) => state.user.notifications.new);
  const newMatchs = useUser((state) => state.user.newMatchs);
  const newMatchsCount = newMatchs.length;

  return (
    <Styled.Aside>
      <ListGroup defaultActiveKey="#link1">
        <Styled.ListGroupItem action as={NavLink} to="/">
          <div>
            <Home />
            Home
          </div>
        </Styled.ListGroupItem>
        <Styled.ListGroupItem action as={NavLink} to="/notifications">
          <div>
            <Bell />
            Notifications
          </div>
          {!!newNotifications.length && (
            <Badge bg="primary">{newNotifications.length}</Badge>
          )}
        </Styled.ListGroupItem>
        <Styled.ListGroupItem action as={NavLink} to="/matchs">
          <div>
            <Heart />
            Matchs
          </div>
          {!!newMatchsCount && <Badge bg="primary">{newMatchsCount}</Badge>}
        </Styled.ListGroupItem>
        <Styled.ListGroupItem action as={NavLink} to="/chats">
          <div>
            <Chat />
            Chats
          </div>
          <Badge bg="primary">2</Badge>
        </Styled.ListGroupItem>
        <Styled.ListGroupItem action as={"button"} to="/liked" disabled>
          <div>
            <Heart />
            Liked
          </div>
        </Styled.ListGroupItem>
        <Styled.ListGroupItem action as={NavLink} to="/settings">
          <div>
            <Gear />
            Settings
          </div>
        </Styled.ListGroupItem>
      </ListGroup>
    </Styled.Aside>
  );
}

export default Aside;
