import { useEffect, useState } from "react";

import ChatSummary from "../../components/ChatSummary";
import Layout from "../../components/Layout";
import { useUser } from "../../stores/user";
import chatsService from "../../services/chats";
import { User } from "../../models/User";
import { Chat } from "../../models/Chat";
import usersService from "../../services/users";

import * as Styled from "./Chats.styled";

function ChatsPage() {
  const userId = useUser((state) => state.user.id);
  const [chats, setChats] = useState<Chat[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setError("");
        const res = await Promise.all([
          chatsService.getAll(),
          usersService.getAll(),
        ]);
        const userChats = res[0].filter((chat) => chat.users.includes(userId));
        setChats(userChats);
        setUsers(res[1]);
      } catch (err) {
        setError("Failed to get chats");
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

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
              chat.users[0] === userId ? chat.users[1] : chat.users[0];
            const interlocutor = users.find(
              (user) => user.id === interlocutorId
            );
            return <ChatSummary key={chat.id} interlocutor={interlocutor} />;
          })
        )}
      </Styled.Chats>
    </Layout>
  );
}

export default ChatsPage;
