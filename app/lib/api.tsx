import axios from './custom.api';

interface IData {
      email: string,
      password: string
}

const loginAPI = async ({ email, password }: IData) => {
      const BACKEND_URL = '/api/v1/auth/login';
      const data = {
            email,
            password
      }

      return await axios.post(BACKEND_URL, data)
}

export { loginAPI }