// import axios from './custom.api';

// interface IBaseAuthData {
//       email?: string;
//       password: string;
// }

// interface ILoginData extends IBaseAuthData {
//       email: string;  // Make email required for login
// }

// interface IChangePasswordData extends IBaseAuthData {
//       _id: string;
//       newPassword: string;
//       confirmNewPassword: string;
// }

// interface IUpdateData {
//       _id: string,
//       email: string,
//       name: string,
//       phone: string,
//       address: string
// }

// interface ICreatePaymentLinkData {
//       amount: number;
//       description: string;
//       items: Array<{
//             name: string;
//             quantity: number;
//             price: number;
//       }>;
// }

// interface ILoginResponse {
//       success: boolean;
//       access_token: string;
//       refresh_token: string;
//       user: {
//             _id: string;
//             email: string;
//             name: string;
//             role: string;
//       };
//       message?: string;
// }



// const loginAPI = async ({ email, password }: ILoginData): Promise<ILoginResponse> => {
//       const BACKEND_URL = '/api/v1/auth/login';
//       const data = {
//             email,
//             password
//       }

//       return await axios.post(BACKEND_URL, data)
// }

// const getInfo = async () => {
//       const BACKEND_URL = '/api/v1/get-info';

//       return await axios.get(BACKEND_URL);
// }

// const getUserById = async (_id: string) => {
//       const BACKEND_URL = `/api/v1/users-by-id/${_id}`;

//       return await axios.get(BACKEND_URL);
// }

// const changePasswordAPI = async ({ _id, password, newPassword, confirmNewPassword }: IChangePasswordData) => {
//       const BACKEND_URL = `/api/v1/change-password/${_id}`;
//       const data = {
//             password,
//             newPassword,
//             confirmNewPassword
//       };

//       return await axios.put(BACKEND_URL, data);
// }

// const updateUserInfo = async ({ _id, email, name, phone, address }: IUpdateData) => {
//       const BACKEND_URL = `/api/v1/update-info/${_id}`;
//       const data = {
//             email,
//             name,
//             phone,
//             address
//       };

//       return await axios.put(BACKEND_URL, data)
// }

// const createPaymentLink = async (data: ICreatePaymentLinkData) => {
//       const BACKEND_URL = '/api/v1/payments/create-embedded-payment-link';
//       return await axios.post(BACKEND_URL, data);
// }

// export { loginAPI, getInfo, getUserById, changePasswordAPI, updateUserInfo, createPaymentLink }

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

interface IUpdateData {
      _id: string,
      email: string,
      name: string,
      phone: string,
      address: string
}

interface ICreatePaymentLinkData {
      amount: number;
      description: string;
      items: Array<{
            name: string;
            quantity: number;
            price: number;
      }>;
}

interface ILoginResponse {
      success: boolean;
      access_token: string;
      refresh_token: string;
      user: {
            _id: string;
            email: string;
            name: string;
            role: string;
      };
      message?: string;
}

// Login API
const loginAPI = async ({ email, password }: ILoginData): Promise<ILoginResponse> => {
      const BACKEND_URL = '/api/v1/auth/login';
      const data = {
            email,
            password
      }

      return await axios.post(BACKEND_URL, data);
}

// Get current user info
const getInfo = async () => {
      const BACKEND_URL = '/api/v1/get-info';
      return await axios.get(BACKEND_URL);
}

// Update user info
const updateUserInfo = async (data: {
      name?: string;
      phone?: string;
      address?: string;
}) => {
      const BACKEND_URL = '/api/v1/update-info';
      return await axios.put(BACKEND_URL, data);
}

// Change password
const changeUserPassword = async (data: {
      currentPassword: string;
      newPassword: string;
      confirmPassword: string;
}) => {
      const BACKEND_URL = '/api/v1/change-password';
      return await axios.put(BACKEND_URL, data);
}

// Get user by ID
const getUserById = async (_id: string) => {
      const BACKEND_URL = `/api/v1/users-by-id/${_id}`;
      return await axios.get(BACKEND_URL);
}

// Your existing change password API (keeping for backward compatibility)
const changePasswordAPI = async ({ _id, password, newPassword, confirmNewPassword }: IChangePasswordData) => {
      const BACKEND_URL = `/api/v1/change-password/${_id}`;
      const data = {
            password,
            newPassword,
            confirmNewPassword
      };

      return await axios.put(BACKEND_URL, data);
}

// Your existing update user info (keeping for backward compatibility)
const updateUserInfoById = async ({ _id, email, name, phone, address }: IUpdateData) => {
      const BACKEND_URL = `/api/v1/update-info/${_id}`;
      const data = {
            email,
            name,
            phone,
            address
      };

      return await axios.put(BACKEND_URL, data);
}

// Create payment link
const createPaymentLink = async (data: ICreatePaymentLinkData) => {
      const BACKEND_URL = '/api/v1/payments/create-embedded-payment-link';
      return await axios.post(BACKEND_URL, data);
}

export {
      loginAPI,
      getInfo,
      getUserById,
      updateUserInfo,
      changeUserPassword,
      changePasswordAPI, // backward compatibility
      updateUserInfoById, // backward compatibility  
      createPaymentLink
}