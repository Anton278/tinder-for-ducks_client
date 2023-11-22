export interface User {
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
}
