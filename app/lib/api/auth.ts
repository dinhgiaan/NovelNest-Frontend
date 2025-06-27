import axios from '../custom.api';

export interface IBaseAuthData {
      email?: string;
      password: string;
}

interface ILoginData extends IBaseAuthData {
      email: string;
}

interface IApiResponse {
      success: boolean;
      message: string;
      data?: any;
}

interface ISocialAuth {
      email: string,
      name: string,
      avatar: string
}

interface IRegister {
      name: string,
      email: string,
      password: string,
      confirmPassword: string
}

interface IVerifyOtp {
      otp: {
            code: string;
      };
}

const loginAPI = async ({ email, password }: ILoginData) => {
      const BACKEND_URL = '/api/v1/auth/login';
      const data = {
            email,
            password
      }

      return await axios.post(BACKEND_URL, data)
}

const socialAPI = async ({ email, name, avatar }: ISocialAuth) => {
      try {
            const BACKEND_URL = '/api/v1/auth/social-auth';
            const response = await axios.post(BACKEND_URL, { email, name, avatar });
            return response.data;
      } catch (error) {
            throw error;
      }
}

const registerAPI = async ({ name, email, password, confirmPassword }: IRegister): Promise<IApiResponse> => {
      try {
            const BACKEND_URL = '/api/v1/auth/register';
            return await axios.post(BACKEND_URL, { email, name, password, confirmPassword });
      } catch (error) {
            throw error
      }
}

const verifyAPI = async (code: IVerifyOtp): Promise<IApiResponse> => {
      try {
            const BACKEND_URL = '/api/v1/auth/verify';
            return await axios.post(BACKEND_URL, code)
      } catch (error) {
            throw error
      }
}

export { loginAPI, socialAPI, registerAPI, verifyAPI }