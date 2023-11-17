import { RegisterResponse } from "../models/responses/register";
import { api } from "../http/api";
import { RegisterRequest } from "../models/requests/register";
import { LoginRequest } from "../models/requests/login";
import { LoginResponse } from "../models/responses/login";

class AuthService {
  async register(data: RegisterRequest): Promise<RegisterResponse> {
    const res = await api.post("/auth/register", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await api.post("/auth/login", data);
    return res.data;
  }

  async refreshAccessToken(): Promise<string> {
    const res = await api.post("/auth/refreshAccessToken");
    return res.data.accessToken;
  }
}

const authService = new AuthService();

export default authService;
