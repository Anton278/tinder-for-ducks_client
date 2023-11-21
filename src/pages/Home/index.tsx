import { useEffect, useState } from "react";

import Layout from "../../components/Layout";
import Card from "../../components/Card";
import { useUsers } from "../../stores/users";
import { User } from "../../models/User";
import { useUser } from "../../stores/user";

import * as Styled from "./Home.styled";

function HomePage() {
  const [relevantUsers, setRelevantUsers] = useState<User[]>([]);
  const { liked, disliked } = useUser((state) => state.user);
  const users = useUsers((state) => state.users);
  const isLoading = useUsers((state) => state.isLoading);
  const error = useUsers((state) => state.error);
  const getUsers = useUsers((state) => state.getUsers);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    if (!users.length) {
      return;
    }
    setRelevantUsers(
      users.filter(
        (user) => !liked.includes(user.id) && !disliked.includes(user.id)
      )
    );
  }, [users]);

  return (
    <Layout>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : isLoading ? (
        <p>loading...</p>
      ) : (
        relevantUsers.map((user, i) => (
          <Card
            key={user.id}
            images={user.duck.images}
            description={user.duck.description}
            index={i}
            id={user.id}
          />
        ))
      )}
    </Layout>
  );
}

export default HomePage;
