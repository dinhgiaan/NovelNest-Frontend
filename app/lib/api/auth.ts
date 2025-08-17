import axios from '../custom.api';

export interface IBaseAuthData {
      email?: string;
      password: string;
}

interface ILoginResponse {
      success: boolean;
      message: string;
      access_token: string;
      refresh_token: string;
      user: {
            _id: string;
            email: string;
            name: string;
            role: string;
            loginMethod?: string;
            avatar?: { url?: string; };
      };
}

interface ILoginData extends IBaseAuthData {
      email: string;
}

interface IApiResponse {
      success: boolean;
      message: string;
      data?: object;
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

interface IResendOtp {
      email: string
}

const BASE_URL = '/api/v1';

const loginAPI = async ({ email, password }: ILoginData): Promise<ILoginResponse> => {
      const BACKEND_URL = `${BASE_URL}/auth/login`;
      const data = {
            email,
            password
      }

      return await axios.post(BACKEND_URL, data);
}

const socialAPI = async ({ email, name, avatar }: ISocialAuth) => {
      try {
            const BACKEND_URL = `${BASE_URL}/auth/social-auth`;
            const response = await axios.post(BACKEND_URL, { email, name, avatar });
            return response.data;
      } catch (error) {
            throw error;
      }
}

const registerAPI = async ({ name, email, password, confirmPassword }: IRegister): Promise<IApiResponse> => {
      try {
            const BACKEND_URL = `${BASE_URL}/auth/register`;
            return await axios.post(BACKEND_URL, { email, name, password, confirmPassword });
      } catch (error) {
            throw error
      }
}

const verifyAPI = async (code: IVerifyOtp): Promise<IApiResponse> => {
      try {
            const BACKEND_URL = `${BASE_URL}/auth/verify`;
            return await axios.post(BACKEND_URL, code)
      } catch (error) {
            throw error
      }
}

const resendOtpAPI = async (email: IResendOtp) => {
      try {
            const BACKEND_URL = `${BASE_URL}/auth/resend-otp`;
            return await axios.post(BACKEND_URL, email);
      } catch (error) {
            throw error
      }
}

export { loginAPI, socialAPI, registerAPI, verifyAPI, resendOtpAPI };
