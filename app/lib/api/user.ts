import axios from '../custom.api';
import { IBaseAuthData } from "./auth";

// Types
export interface IUserData {
      _id: string;
}

export interface IUpdateUserData {
      _id: string;
      email: string;
      name: string;
      phone: string;
      address: string;
}

export interface IChangePasswordData extends IBaseAuthData {
      _id: string;
      newPassword: string;
      confirmNewPassword: string;
}

const BASE_URL = '/api/v1';

export const userService = {
      async getInfo() {
            try {
                  const response = await axios.get(`${BASE_URL}/get-info`);
                  return response.data;
            } catch (error) {
                  throw new Error('Failed to get user info');
            }
      },

      async changePassword(data: IChangePasswordData) {
            const { _id, password, newPassword, confirmNewPassword } = data;
            try {
                  const response = await axios.put(`${BASE_URL}/change-password/${_id}`, {
                        password,
                        newPassword,
                        confirmNewPassword
                  });
                  return response.data;
            } catch (error) {
                  throw new Error('Failed to change password');
            }
      },


      async updateUserInfo(data: {
            name?: string;
            phone?: string;
            address?: string;
      }) {
            const BACKEND_URL = '/api/v1/update-info';
            return await axios.put(BACKEND_URL, data);
      },

      async purchasedBooks() {
            try {
                  const response = await axios.get(`${BASE_URL}/purchased-books`);
                  return {
                        success: true,
                        data: response,
                        total: response?.length || 0
                  };
            } catch (error: any) {
                  throw new Error('Failed to get purchased books: ' + error.message);
            }
      }
};