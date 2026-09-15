import type { AxiosResponse } from "axios";
import type { IUser } from "../types";
import axios from "axios";

export class UserService {
    static async getUsers(): Promise<AxiosResponse<IUser[]>> {
        return axios.get<IUser[]>('/users.json')
    }

}
