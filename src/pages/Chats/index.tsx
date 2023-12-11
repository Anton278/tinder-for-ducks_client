import { useEffect, useState } from "react";

import ChatSummary from "../../components/ChatSummary";
import Layout from "../../components/Layout";
import { useUser } from "../../stores/user";
import chatsService from "../../services/chats";
import usersService from "../../services/users";
import { GetChatsRes } from "models/responses/getChats";
import { GetUsersResponse } from "models/responses/getUsers";

import * as Styled from "./Chats.styled";

function ChatsPage() {
  const {
    isLoading: isLoadingUser,
    user: { id: uid },
  } = useUser();
  const [chats, setChats] = useState<GetChatsRes>([]);
  const [users, setUsers] = useState<GetUsersResponse>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoadingUser) {
      return;
    }

    const getData = async () => {
      try {
        setError("");
        const res = await Promise.all([
          chatsService.getAll(),
          usersService.getAll(),
        ]);
        setChats(res[0]);
        setUsers(res[1]);
      } catch (err) {
        setError("Failed to get chats");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, [isLoadingUser]);

  return (
    <Layout>
      <Styled.Title>Chats</Styled.Title>
      <Styled.Chats>
        {error ? (
          <p className="text-danger">{error}</p>
        ) : isLoading ? (
          <p>loading...</p>
        ) : (
          chats.map((chat) => {
            const interlocutorId =
              chat.users[0] === uid ? chat.users[1] : chat.users[0];
            const interlocutor = users.find(
              (user) => user.id === interlocutorId
            );
            return (
              <ChatSummary
                key={chat.id}
                interlocutor={interlocutor}
                lastMessage={chat.lastMessage}
                unreadMessagesCount={chat.unreadMessagesCount}
                id={chat.id}
              />
            );
          })
        )}
      </Styled.Chats>
    </Layout>
  );
}

export default ChatsPage;
