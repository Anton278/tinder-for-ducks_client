import { Link } from "react-router-dom";

import { Notification } from "../models/Notification";

export const parseNotification = (notification: Notification) => {
  switch (notification.type) {
    case "newMatch":
      return (
        <p>
          You have <b>1 new match</b>. Check out who is it{" "}
          <Link to="/matchs">here</Link>.
        </p>
      );
    case "newMatchs":
      return (
        <p>
          You have <b>2 new matchs</b>. Check out who are they{" "}
          <Link to="/matchs">here</Link>.
        </p>
      );
  }
};
