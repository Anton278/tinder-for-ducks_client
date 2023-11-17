export interface LoginResponse {
  accessToken: string;
  user: {
    username: string;
    duck: {
      images: string[];
      description: string;
    };
    id: string;
  };
}
