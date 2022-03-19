import { ApiConfig, AxiosResponse } from '../types';
/**
 * Provide available themes for toast message
 */
export declare type Theme = 'light' | 'dark' | 'colored';
/**
 * Hook to provide axios interceptor
 * @returns
 * // data - Response data object,
 * // isPending - Loading state true, false,
 * // error - Error response,
 * // apiHandler - Function to handle api requests
 */
export declare function useMultipartInterceptor(): {
    data: any;
    isPending: boolean;
    error: any;
    apiHandler: (config: ApiConfig) => Promise<void | AxiosResponse<any>>;
};
