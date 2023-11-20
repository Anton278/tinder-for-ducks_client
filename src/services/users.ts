import { api } from "../http/api";
import { GetUsersResponse } from "../models/responses/getUsers";

class UsersService {
  async getAll(): Promise<GetUsersResponse> {
    const res = await api.get("/users");
    return res.data;
  }
}

const usersService = new UsersService();

export default usersService;
