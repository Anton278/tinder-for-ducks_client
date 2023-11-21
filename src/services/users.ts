import { api } from "../http/api";
import { User } from "../models/User";
import { GetUsersResponse } from "../models/responses/getUsers";

class UsersService {
  async getAll(): Promise<GetUsersResponse> {
    const res = await api.get("/users");
    return res.data;
  }

  async getOne(id: string): Promise<User> {
    const res = await api.get(`/users/${id}`);
    return res.data;
  }

  async update(user: User): Promise<User> {
    const res = await new Promise<User>((res, rej) =>
      setTimeout(() => res(user), 1500)
    );
    return res;
  }
}

const usersService = new UsersService();

export default usersService;
