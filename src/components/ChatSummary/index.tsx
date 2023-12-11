import Avatar from "../Avatar";
import { GetUserResponse } from "models/responses/getUser";

import * as Styled from "./ChatSummary.styled";
import { Message } from "models/Chat";

type ChatSummaryProps = {
  interlocutor: GetUserResponse | undefined;
  lastMessage: Message;
  unreadMessagesCount: number;
  id: string;
};

function ChatSummary({
  interlocutor,
  lastMessage,
  unreadMessagesCount,
  id,
}: ChatSummaryProps) {
  return (
    <Styled.ChatSummary to={`/chats/${id}`}>
      <Avatar src={interlocutor?.duck.images[0]} />
      <div>
        <p>
          <b>username</b>
        </p>
        <p>
          {unreadMessagesCount ? (
            <b>{unreadMessagesCount} unread messages</b>
          ) : (
            lastMessage.message
          )}
        </p>
      </div>
    </Styled.ChatSummary>
  );
}

export default ChatSummary;
