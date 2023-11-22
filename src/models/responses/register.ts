import { Notification } from "../Notification";

export interface RegisterResponse {
  accessToken: string;
  user: {
    username: string;
    duck: {
      images: string[];
      description: string;
    };
    id: string;
    liked: string[];
    disliked: string[];
    matchs: string[];
    newMatchs: string[];
    notifications: {
      new: Notification[];
      old: Notification[];
    };
  };
}
