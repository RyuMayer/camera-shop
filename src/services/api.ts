<<<<<<< HEAD
import axios, { AxiosInstance } from 'axios';
=======
import axios, { AxiosError, AxiosInstance } from 'axios';
>>>>>>> 53fb3eb2ba81d429d14c32d2fdf4e2515c48a2fa

import { BASE_URL, REQUEST_TIMEOUT } from '../const';

export function createApi(): AxiosInstance {
  const api = axios.create({
    baseURL: BASE_URL,
    timeout: REQUEST_TIMEOUT,
  });

  //FIXME: Общий или на каждый rejected?
  // api.interceptors.response.use(
  //   (response) => response,
  //   (error: AxiosError) => {
  //     if (error.response?.status !== StatusCodes.UNAUTHORIZED) {
  //       toast.error(error.message);
  //     }

  //     throw error;
  //   },
  // );

  return api;
}
