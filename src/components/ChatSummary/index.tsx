import Avatar from "../Avatar";
import { User } from "../../models/User";

import * as Styled from "./ChatSummary.styled";

type ChatSummaryProps = {
  interlocutor: User | undefined;
};

function ChatSummary({ interlocutor }: ChatSummaryProps) {
  return (
    <Styled.ChatSummary to="/chats/1">
      <Avatar src={interlocutor?.duck.images[0]} />
      <div>
        <p>
          <b>{interlocutor?.username}</b>
        </p>
        <p>
          <b>2 unread messages</b>
        </p>
      </div>
    </Styled.ChatSummary>
  );
}

export default ChatSummary;
