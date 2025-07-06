import axios from "../custom.api"

const BASE_URL = "/api/v1/orders"

export const orderService = {
      async getHistoryOrder(filter = "all", page = 1, limit = 10) {
            try {
                  const response = await axios.get(`${BASE_URL}/user/history`, {
                        params: { filter, page, limit },
                  })

                  const data = response.data

                  if (!data || !Array.isArray(data.orders)) {
                        console.error("❌ Invalid data structure:", data)
                        throw new Error("Invalid API response structure")
                  }

                  return data
            } catch (error) {
                  throw error
            }
      },

      async getOrderDetail(orderId: string) {
            try {
                  const response = await axios.get(`${BASE_URL}/user/${orderId}`)
                  return response.data
            } catch (error) {
                  throw error
            }
      },
}
