import { useEffect } from "react";

import Layout from "../../components/Layout";
import { useUser } from "../../stores/user";
import { parseNotification } from "../../utils/parseNotification";

import * as Styled from "./Notifications.styled";

function NotificationsPage() {
  const user = useUser((state) => state.user);
  const notifications = useUser((state) => state.user.notifications);
  const updateUser = useUser((state) => state.updateUser);

  const parsedNotifications = {
    old: notifications.old.map((notification) =>
      parseNotification(notification)
    ),
    new: notifications.new.map((notification) =>
      parseNotification(notification)
    ),
  };

  useEffect(() => {
    return () => {
      updateUser({
        ...user,
        notifications: {
          new: [],
          old: [...user.notifications.new, ...user.notifications.old],
        },
      });
    };
  }, []);

  return (
    <Layout>
      <Styled.Title>Notifications</Styled.Title>
      {parsedNotifications.new.map((el) => el)}
      {!!parsedNotifications.new.length && <hr />}
      {parsedNotifications.old.map((el) => el)}
    </Layout>
  );
}

export default NotificationsPage;
