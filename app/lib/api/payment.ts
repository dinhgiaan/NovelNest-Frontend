import axios from '../custom.api';

interface ICreatePaymentLinkData {
      amount: number;
      description: string;
      items: Array<{
            name: string;
            quantity: number;
            price: number;
      }>;
}

const createPaymentLink = async (data: ICreatePaymentLinkData) => {
      const BACKEND_URL = '/api/v1/payments/create-embedded-payment-link';
      return await axios.post(BACKEND_URL, data);
}

export { createPaymentLink }