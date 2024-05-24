/* eslint-disable no-param-reassign */
import axios, { AxiosError } from 'axios';

const client = axios.create({ baseURL: '/api', withCredentials: true });

client.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('access_token');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (res) => {
    if (res.status === 404) {
      window.location.href = 'http://localhost:5173/notFound'; // 배포 후 => 배포주소/notFound
    }
    return res;
  },
  async (err) => {
    if (err instanceof AxiosError && err.config) {
      if (err.response?.status === 401) {
        const { access_token: accessToken } = (
          await axios.post(
            '/api/api/member/reissue',
            {},
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('access_token')}`,
              },
              withCredentials: true,
            },
          )
        ).data;
        if (accessToken) {
          localStorage.setItem('access_token', accessToken);
          return client(err.config);
        }
      }
    }
    return Promise.reject(err);
  },
);
export default client;
