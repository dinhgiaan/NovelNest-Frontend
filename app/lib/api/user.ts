import axios from '../custom.api';
import { IBaseAuthData } from "./auth";

interface IUserData {
      _id: string;
}

interface IUpdateData {
      _id: string,
      email: string,
      name: string,
      phone: string,
      address: string
}

interface IChangePasswordData extends IBaseAuthData {
      _id: string;
      newPassword: string;
      confirmNewPassword: string;
}


const getInfo = async () => {
      const BACKEND_URL = '/api/v1/get-info';

      return await axios.get(BACKEND_URL);
}

const getUserById = async ({ _id }: IUserData) => {
      const BACKEND_URL = `/api/v1/users-by-id/${_id}`;

      return await axios.get(BACKEND_URL);
}

const changePasswordAPI = async ({ _id, password, newPassword, confirmNewPassword }: IChangePasswordData) => {
      const BACKEND_URL = `/api/v1/change-password/${_id}`;
      const data = {
            password,
            newPassword,
            confirmNewPassword
      };

      return await axios.put(BACKEND_URL, data);
}

const updateUserInfo = async ({ _id, email, name, phone, address }: IUpdateData) => {
      const BACKEND_URL = `/api/v1/update-info/${_id}`;
      const data = {
            email,
            name,
            phone,
            address
      };

      return await axios.put(BACKEND_URL, data)
}

export { getInfo, getUserById, changePasswordAPI, updateUserInfo }