import axios from 'axios';
/**
 * @param {any} messages - error messages
 * @returns Promise rejection with -messages array
 */
var parseError = function (messages) {
    if (messages) {
        if (messages instanceof Array) {
            return Promise.reject({ messages: messages });
        }
        else {
            return Promise.reject({ messages: [messages] });
        }
    }
    else {
        return Promise.reject({ messages: ['error'] });
    }
};
/**
 * Axios instance
 */
var instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});
/**
 * Request interceptor
 */
instance.interceptors.request.use(function (config) {
    var accessToken = localStorage.getItem('authToken');
    if (accessToken) {
        config.headers = {
            Authorization: "Bearer ".concat(accessToken),
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    }
    else {
        config.headers = {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        };
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});
/**
 * Response interceptor
 */
instance.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    console.warn('Error status', error);
    if (error.response) {
        if (error.response.data.message === 'Unauthorized') {
            localStorage.removeItem('authToken');
            return (window.location.href = '/');
        }
        return parseError(error.response);
    }
    else {
        return Promise.reject(error);
    }
});
export var http = instance;
