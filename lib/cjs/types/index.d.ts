import { AxiosRequestConfig, Method } from 'axios';
import { Theme, ToastPosition } from 'react-toastify';
/**
 * Interface for axios response
 */
export interface AxiosResponse<T = any> {
    data: T;
    status: number;
    statusText: string;
    headers: any;
    config: AxiosRequestConfig;
    request?: any;
}
/**
 * Interface for api configuration
 */
export interface ApiConfig {
    url: string;
    method: Method;
    data?: any;
    params?: any;
    successMessage?: string;
    displayToast: boolean;
    position?: ToastPosition;
    hideProgressBar?: boolean;
    delay?: number;
    theme?: Theme;
}
/**
 * Interface for Api response error
 */
export interface ApiResponseError {
    messages: Object;
}
