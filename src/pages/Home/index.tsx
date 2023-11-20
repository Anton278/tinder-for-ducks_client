import { useEffect } from "react";

import Layout from "../../components/Layout";
import Card from "../../components/Card";
import { useUsers } from "../../stores/users";

import * as Styled from "./Home.styled";

function HomePage() {
  const users = useUsers((state) => state.users);
  const isLoading = useUsers((state) => state.isLoading);
  const error = useUsers((state) => state.error);
  const getUsers = useUsers((state) => state.getUsers);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Layout>
      {error ? (
        <p className="text-danger">{error}</p>
      ) : isLoading ? (
        <p>loading...</p>
      ) : (
        users.map((user, i) => (
          <Card
            key={user.id}
            images={user.duck.images}
            description={user.duck.description}
            index={i}
          />
        ))
      )}
    </Layout>
  );
}

export default HomePage;
