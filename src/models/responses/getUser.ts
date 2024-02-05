import { User } from "models/User";

export type GetUserResponse =
  | {
      duck: {
        images: string[];
        description: string;
      };
      id: string;
    }
  | User;
