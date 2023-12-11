import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate, useParams } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";
import { useRef, useEffect, useState } from "react";

import Avatar from "../../components/Avatar";
import ThreeDotsVert from "../../components/Icons/ThreeDotsVert";
import Layout from "../../components/Layout";
import ArrowLeft from "../../components/Icons/ArrowLeft";
import Ban from "../../components/Icons/Ban";
import { useUser } from "stores/user";
import { Message } from "models/Chat";

import * as Styled from "./Chat.styled";
import { ws } from "App";

import { getMessages } from "utils/wsActions";
import { useChats } from "stores/chats";

type Data = {
  totalPages: number;
  messages: Message[];
};

function ChatPage() {
  const navigate = useNavigate();
  const uid = useUser((state) => state.user.id);
  const { id: chatId } = useParams();
  const areChatsObserved = useChats((state) => state.areObserved);

  useEffect(() => {
    if (!chatId) {
      return;
    }
    getMessages(chatId);
  }, [ws.readyState, areChatsObserved]);

  const [data, setData] = useState<Data>({
    messages: [],
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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
          <Styled.Message className="bg-success-subtle">
            Message 1
          </Styled.Message>
          <Styled.Message className="bg-warning-subtle">
            Message 2
          </Styled.Message>
        </Styled.Center>
        <Styled.Bottom>
          <Form.Control as="textarea" />
          <Button variant="primary">Send</Button>
        </Styled.Bottom>
      </Styled.Wrapper>
    </Layout>
  );
}

export default ChatPage;
