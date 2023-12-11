import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

import Avatar from "../../components/Avatar";
import ThreeDotsVert from "../../components/Icons/ThreeDotsVert";
import Layout from "../../components/Layout";
import ArrowLeft from "../../components/Icons/ArrowLeft";
import Ban from "../../components/Icons/Ban";
import { Message } from "models/Chat";
import { ws } from "App";
import { getMessages } from "utils/wsActions";
import { useChats } from "stores/chats";
import { sendMessage as sendMessageWsUtil } from "utils/wsActions";

import * as Styled from "./Chat.styled";
import { useUser } from "stores/user";

type Data = {
  totalPages: number;
  messages: Message[];
};

function ChatPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const uid = useUser((state) => state.user.id);
  const areChatsObserved = useChats((state) => state.areObserved);
  const chats = useChats((state) => state.chats);
  const chat = id ? chats[id] : null;

  const [value, setValue] = useState("");

  useEffect(() => {
    if (!id) {
      return;
    }
    getMessages(id);
  }, [ws.readyState, areChatsObserved]);

  const sendMessage = () => {
    if (!id) {
      return;
    }
    sendMessageWsUtil(id, value);
    setValue("");
  };

  if (!chat) {
    navigate("/");
    return null;
  }

  const messages = chat.chat.messages.slice().reverse();

  return (
    <Layout>
      <Styled.Wrapper>
        <Styled.Top>
          <Styled.TopLeft>
            <Button variant="light" onClick={() => navigate("/chats")}>
              <ArrowLeft />
            </Button>
            <Avatar src="/duck.jfif" />
            <p>
              <b>sarah001</b>
            </p>
          </Styled.TopLeft>
          <Dropdown>
            <Styled.DropdownToggle variant="secondary">
              <ThreeDotsVert />
            </Styled.DropdownToggle>

            <Dropdown.Menu>
              <Dropdown.Item as={Button}>
                <Stack direction="horizontal" gap={2}>
                  <Ban /> Block user
                </Stack>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Styled.Top>
        <Styled.Center>
          {messages.map((message) => (
            <Styled.Message $isOnRight={message.authorId === uid}>
              {message.message}
            </Styled.Message>
          ))}
        </Styled.Center>
        <Styled.Bottom>
          <Form.Control
            as="textarea"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button variant="primary" onClick={sendMessage}>
            Send
          </Button>
        </Styled.Bottom>
      </Styled.Wrapper>
    </Layout>
  );
}

export default ChatPage;
