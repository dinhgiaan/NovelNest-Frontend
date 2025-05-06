import axios from '../custom.api';

export interface IBaseAuthData {
      email?: string;
      password: string;
}

interface ILoginData extends IBaseAuthData {
      email: string;
}

interface ISocialAuth {
      email: string,
      name: string,
      avatar: string
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

export { loginAPI, socialAPI }