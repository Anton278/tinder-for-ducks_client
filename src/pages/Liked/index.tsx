import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import { useUser } from "../../stores/user";
import { useUsers } from "../../stores/users";
import { User } from "../../models/User";
import Card from "../../components/Card";

import * as Styled from "./Liked.styled";

function LikedPage() {
  const [liked, setLiked] = useState<User[]>([]);
  const user = useUser((state) => state.user);
  const { users, getUsers, isLoading, error } = useUsers();

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!isLoading && !error) {
      const res: User[] = [];
      user.liked.forEach((liked) => {
        const likedUser = users.find((user) => user.id === liked);
        if (likedUser) {
          // res.push(likedUser);
        }
      });
      setLiked(res);
    }
  }, [isLoading, error, user.liked]);

  return (
    <Layout>
      <Styled.Title>Liked</Styled.Title>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : isLoading ? (
        <p>loading...</p>
      ) : (
        <Styled.CardsWrapper>
          {liked.map((user, i) => (
            <Card
              key={user.id}
              images={user.duck.images}
              description={user.duck.description}
              index={i}
              id={user.id}
              swipable={false}
              buttonType="unlike"
            />
          ))}
        </Styled.CardsWrapper>
      )}
    </Layout>
  );
}

export default LikedPage;
