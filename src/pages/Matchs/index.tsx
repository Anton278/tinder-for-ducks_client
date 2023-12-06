import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import { useUser } from "../../stores/user";
import usersService from "../../services/users";
import Card from "../../components/Card";
import { GetUserResponse } from "models/responses/getUser";

import * as Styled from "./Matchs.styled";

function MatchsPage() {
  const [data, setData] = useState<GetUserResponse[]>([]);
  const user = useUser((state) => state.user);
  const isLoadingUser = useUser((state) => state.isLoading);
  const matchs = useUser((state) => state.user.matchs);
  const newMatchs = useUser((state) => state.user.newMatchs);
  const updateUser = useUser((state) => state.updateUser);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isLoadingUser) {
      return;
    }
    const getMatchs = async () => {
      try {
        setError("");
        setIsLoading(true);
        const res = await Promise.all(
          [...newMatchs, ...matchs].map((match) => usersService.getOne(match))
        );
        setData(res);
      } catch (err) {
        setError("Failed to get matchs");
      } finally {
        setIsLoading(false);
      }
    };

    getMatchs();
  }, [isLoadingUser]);

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
