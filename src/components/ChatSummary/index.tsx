import Avatar from "../Avatar";

import * as Styled from "./ChatSummary.styled";

function ChatSummary() {
  return (
    <Styled.ChatSummary to="/chats/1">
      <Avatar />
      <div>
        <p>
          <b>sarah001</b>
        </p>
        <p>
          <b>2 unread messages</b>
        </p>
      </div>
    </Styled.ChatSummary>
  );
}

export default ChatSummary;
