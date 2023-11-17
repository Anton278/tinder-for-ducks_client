export interface RegisterResponse {
  accessToken: string;
  username: string;
  duck: {
    images: string[];
    description: string;
  };
  id: string;
}
