import axios, { endpoints } from 'src/utils/axios';

export const getExchangeStatus = async () => {
  try {
    const res = await axios.get(endpoints.exchange.status);
    console.log('res', res);
  } catch (e) {
    console.error(e);
  }
};

export const connectExchange = async ({ apiKey, apiSecret, exchangeName }) => {
  try {
    const res = await axios.post(endpoints.exchange.connect, {
      api_key: apiKey,
      api_secret: apiSecret,
      exchange_name: exchangeName,
    });
    console.log('res', res);
  } catch (e) {
    console.error(e);
  }
};

export const disconnectExchange = async ({ exchangeName }) => {
  try {
    const res = await axios.delete(endpoints.exchange.disconnect, {
      exchange_name: exchangeName,
    });
    console.log('res', res);
  } catch (e) {
    console.error(e);
  }
};
