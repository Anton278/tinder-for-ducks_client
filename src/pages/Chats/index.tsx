import ChatSummary from "../../components/ChatSummary";
import Layout from "../../components/Layout";

import * as Styled from "./Chats.styled";

function ChatsPage() {
  return (
    <Layout>
      <Styled.Title>Chats</Styled.Title>
      <Styled.Chats>
        <ChatSummary />
        <ChatSummary />
      </Styled.Chats>
    </Layout>
  );
}

export default ChatsPage;
