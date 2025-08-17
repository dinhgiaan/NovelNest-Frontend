import axios from '../custom.api';

const BASE_URL = '/api/v1';

export const categoryService = {
      async getAllCategoriesAPI() {
            try {
                  const respone = await axios.get(`${BASE_URL}/categories`);
                  return respone.data;
            } catch (error) {
                  throw error;
            }
      }
}
