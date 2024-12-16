import axios, { endpoints } from 'src/utils/axios';

export const startBot = async (body) => {
  try {
    const res = await axios.post(endpoints.bot.start, body);
    return res?.data;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const stopBot = async () => {
  try {
    const res = await axios.post(endpoints.bot.stop);
  } catch (e) {
    console.error(e);
  }
};
