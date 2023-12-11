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
import { sendMessage as sendMessageWsUtil } from "utils/wsActions";

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

  useEffect(() => {
    if (!id) {
      return;
    }
    getMessages(id);
  }, [ws.readyState, areChatsObserved]);

  const [data, setData] = useState<Data>({
    messages: [],
    totalPages: 1,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const [value, setValue] = useState("");

  const sendMessage = () => {
    if (!id) {
      return;
    }
    sendMessageWsUtil(id, value);
    setValue("");
  };

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
