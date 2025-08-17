import axios from "../custom.api"

export interface IChangePasswordData {
      currentPassword: string
      newPassword: string
      confirmPassword: string
}

export interface ApiResponse<T> {
      success: boolean
      message: string
      data?: T
}

const BASE_URL = "/api/v1"

export const userService = {
      async getInfo() {
            try {
                  const response = await axios.get(`${BASE_URL}/get-info`)
                  return response.data
            } catch (error) {
                  throw new Error("Failed to get user info: " + (error as Error).message)
            }
      },

      async updateUserInfo(data: IUser): Promise<ApiResponse<IUser>> {
            try {
                  const updatePayload = {
                        name: data.name,
                        gender: data.gender,
                  }

                  return axios.put(`${BASE_URL}/update-info`, updatePayload) as Promise<ApiResponse<IUser>>
            } catch (error) {
                  throw error
            }
      },

      async changePassword({ currentPassword, newPassword, confirmPassword }: IChangePasswordData) {
            try {
                  const data = await axios.put(`${BASE_URL}/change-password`, {
                        currentPassword,
                        newPassword,
                        confirmPassword,
                  })
                  return data
            } catch (error) {
                  console.error("Password change failed:", error)
                  throw new Error("Failed to change password")
            }
      },

      async getPurchasedBooks() {
            try {
                  const data = await axios.get(`${BASE_URL}/purchased-books`)
                  return {
                        success: true,
                        data: data,
                        total: data.data?.length || 0,
                  }
            } catch (error) {
                  throw new Error("Failed to get purchased books: " + (error as Error).message)
            }
      },

      async logout() {
            try {
                  const data = await axios.post(`${BASE_URL}/logout`)
                  return data;
            } catch (error) {
                  throw new Error("Failed to logout: " + (error as Error).message)
            }
      },

      async getFavourites() {
            try {
                  const data = await axios.get(`${BASE_URL}/favourites`)
                  return {
                        data
                  }
            } catch (error) {
                  throw new Error("Failed to get favorites: " + (error as Error).message)
            }
      },

      async uploadAvatar(file: File) {
            try {
                  const formData = new FormData();
                  formData.append('avatar', file);

                  const response = await axios.post(`${BASE_URL}/upload-avatar`, formData, {
                        headers: {
                              'Content-Type': 'multipart/form-data'
                        },
                        timeout: 30000
                  });
                  return response;

            } catch (error) {
                  if (error && typeof error === 'object' && 'response' in error) {
                        const axiosError = error as {
                              response?: {
                                    status?: number;
                                    data?: { message?: string };
                              };
                        };

                        if (axiosError.response?.status === 413) {
                              throw new Error('File quá lớn. Vui lòng chọn file nhỏ hơn.');
                        }

                        if (axiosError.response?.status === 415) {
                              throw new Error('Định dạng file không được hỗ trợ.');
                        }

                        const errorMessage = axiosError.response?.data?.message || 'Upload avatar thất bại';
                        throw new Error(errorMessage);
                  }

                  throw new Error('Upload avatar thất bại');
            }
      }
}
