import { GetUserResponse } from "models/responses/getUser";
import { api } from "../http/api";
import { User } from "../models/User";
import { GetUsersResponse } from "../models/responses/getUsers";

class UsersService {
  async getAll(): Promise<GetUsersResponse> {
    const res = await api.get("/users");
    return res.data;
  }

  async getOne(id: string): Promise<GetUserResponse> {
    const res = await api.get(`/users/${id}`);
    return res.data;
  }

  async update(user: User): Promise<User> {
    const res = await api.put(`/users`, user);
    return res.data;
  }
}

const usersService = new UsersService();

export default usersService;
