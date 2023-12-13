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

    localStorage.setItem("accessToken", res.data.accessToken);
    api.defaults.headers["Access-Token"] = `Bearer ${res.data.accessToken}`;

    return res.data;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    const res = await api.post("/auth/login", data);
    return res.data;
  }

  async refreshAccessToken(): Promise<string> {
    const res = await api.post<{ accessToken: string }>(
      "/auth/refreshAccessToken"
    );
    const accessToken = res.data.accessToken;
    api.defaults.headers["Access-Token"] = `Bearer ${accessToken}`;
    localStorage.setItem("accessToken", accessToken);
    return accessToken;
  }

  async logout() {
    await api.post("/auth/logout");
    localStorage.removeItem("accessToken");
    api.defaults.headers["Access-Token"] = `Bearer null`;
  }

  async checkUsernameUniqueness(username: string) {
    const res = await api.get(
      `/auth/checkUsernameUniqueness?username=${username}`
    );
    return res.data;
  }

  async changePassword(oldPassword: string, newPassword: string) {
    const res = await api.post("/auth/changePassword", {
      oldPassword,
      newPassword,
    });
    return res.data;
  }
}

const authService = new AuthService();

export default authService;
