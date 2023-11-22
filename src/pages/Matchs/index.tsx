import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import { useUser } from "../../stores/user";
import { User } from "../../models/User";
import usersService from "../../services/users";
import Card from "../../components/Card";

import * as Styled from "./Matchs.styled";

function MatchsPage() {
  const [data, setData] = useState<User[]>([]);
  const user = useUser((state) => state.user);
  const matchs = useUser((state) => state.user.matchs);
  const newMatchs = useUser((state) => state.user.newMatchs);
  const updateUser = useUser((state) => state.updateUser);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const getMatchs = async () => {
      try {
        setError("");
        setIsLoading(true);
        const users = await usersService.getAll();
        const result: User[] = [];
        [...newMatchs, ...matchs].forEach((match) => {
          const user = users.find((user) => user.id === match);
          if (user) {
            result.push(user);
          }
        });
        setData(result);
      } catch (err) {
        setError("Failed to get matchs");
      } finally {
        setIsLoading(false);
      }
    };

    getMatchs();
  }, []);

  useEffect(() => {
    if (isLoading || error) {
      return;
    }
    if (!newMatchs.length) {
      return;
    }
    const clearNewMatchs = async () => {
      try {
        await updateUser({
          ...user,
          matchs: [...user.newMatchs, ...user.matchs],
          newMatchs: [],
        });
      } catch (err) {}
    };
    clearNewMatchs();
  }, [newMatchs, isLoading, error]);

  return (
    <Layout>
      <Styled.Title>Matchs</Styled.Title>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : isLoading ? (
        <p>loading...</p>
      ) : !data.length ? (
        <p>No matchs yet</p>
      ) : (
        <Styled.CardsWrapper>
          {data.map((user, i) => (
            <Card
              key={user.id}
              images={user.duck.images}
              description={user.duck.description}
              index={i}
              id={user.id}
              swipable={false}
              buttonType="message"
            />
          ))}
        </Styled.CardsWrapper>
      )}
    </Layout>
  );
}

export default MatchsPage;
