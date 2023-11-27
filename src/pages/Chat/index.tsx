import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import { useNavigate } from "react-router-dom";
import Stack from "react-bootstrap/Stack";
import Form from "react-bootstrap/Form";

import Avatar from "../../components/Avatar";
import ThreeDotsVert from "../../components/Icons/ThreeDotsVert";
import Layout from "../../components/Layout";
import ArrowLeft from "../../components/Icons/ArrowLeft";
import Ban from "../../components/Icons/Ban";

import * as Styled from "./Chat.styled";

function ChatPage() {
  const navigate = useNavigate();

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
          <Styled.Message className="bg-success-subtle">
            Message 3
          </Styled.Message>
          <Styled.Message className="bg-warning-subtle">
            Message 4
          </Styled.Message>
          <Styled.Message className="bg-success-subtle">
            Message 5
          </Styled.Message>
          <Styled.Message className="bg-warning-subtle">
            Message 6
          </Styled.Message>
          <Styled.Message className="bg-success-subtle">
            Message 7
          </Styled.Message>
          <Styled.Message className="bg-warning-subtle">
            Message 8
          </Styled.Message>
          <Styled.Message className="bg-success-subtle">
            Message 9
          </Styled.Message>
          <Styled.Message className="bg-warning-subtle">
            Message 10
          </Styled.Message>
          <Styled.Message className="bg-success-subtle">
            Message 11
          </Styled.Message>
          <Styled.Message className="bg-warning-subtle">
            Message 12
          </Styled.Message>
          <Styled.Message className="bg-success-subtle">
            Message 13
          </Styled.Message>
          <Styled.Message className="bg-warning-subtle">
            Message 14
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
