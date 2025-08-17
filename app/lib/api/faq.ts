import axios from "../custom.api"

const BASE_URL = "/api/v1"

export const faqService = {
      async getAllFAQ() {
            try {
                  const response = await axios.get(`${BASE_URL}/faqs`);
                  return response;
            } catch (error) {
                  throw error
            }
      }
}
