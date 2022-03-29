import axios from 'axios';

/**
 * @param {any} messages - error messages
 * @returns Promise rejection with -messages array
 */
const parseError = (messages: any) => {
  if (messages) {
    if (messages instanceof Array) {
      return Promise.reject({ messages: messages });
    } else {
      return Promise.reject({ messages: [messages] });
    }
  } else {
    return Promise.reject({ messages: ['error'] });
  }
};

/**
 * Axios instance
 */

let instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

/**
 * Request interceptor
 */

instance.interceptors.request.use(
  config => {
    const accessToken = localStorage.getItem('authToken');
    if (accessToken) {
      config.headers = {
        Authorization: `Bearer ${accessToken}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    } else {
      config.headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 */

instance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.warn('Error status', error);
    if (error.response) {
      if (error.response.data.message === 'Unauthorized') {
        localStorage.removeItem('authToken');
        return (window.location.href = '/');
      }
      return parseError(error.response);
    } else {
      return Promise.reject(error);
    }
  }
);

export const http = instance;
