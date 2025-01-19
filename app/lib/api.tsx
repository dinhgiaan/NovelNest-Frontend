import axios from './custom.api';

interface IBaseAuthData {
      email?: string;
      password: string;
}

interface ILoginData extends IBaseAuthData {
      email: string;  // Make email required for login
}

interface IChangePasswordData extends IBaseAuthData {
      _id: string;
      newPassword: string;
      confirmNewPassword: string;
}

interface IUserData {
      _id: string;
}

const loginAPI = async ({ email, password }: ILoginData) => {
      const BACKEND_URL = '/api/v1/auth/login';
      const data = {
            email,
            password
      }

      return await axios.post(BACKEND_URL, data)
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

export { loginAPI, getInfo, getUserById, changePasswordAPI }