import { useCallback, useState } from 'react';
import { toast, TypeOptions } from 'react-toastify';
import { httpMultipart } from '../interceptors/interceptor-multipart';
import { ApiConfig, ApiResponseError, AxiosResponse } from '../types';

/**
 * Provide available themes for toast message
 */
export type Theme = 'light' | 'dark' | 'colored';

/**
 * Hook to provide axios interceptor
 * @returns
 * // data - Response data object,
 * // isPending - Loading state true, false,
 * // error - Error response,
 * // apiHandler - Function to handle api requests
 */

export function useMultipartInterceptor() {
  const [data, setData] = useState<any>(undefined);
  const [isPending, setIsPending] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);

  /**
   * Method to display toast message
   * @param {TypeOptions} method - To define toast type
   * @param {string} message - Message to display in toast
   * @param {ApiConfig} config - All configuration of request
   */
  const pushToast = (
    method: TypeOptions,
    message: string,
    config: ApiConfig
  ) => {
    toast[method](message, {
      position: config?.position,
      autoClose: config?.delay || 3000,
      hideProgressBar: config?.hideProgressBar,
      progress: undefined,
      rtl: false,
      theme: config.theme,
    });
  };

  /**
   * To handle success case of the request
   * @param {AxiosResponse} res - Axios request payload
   * @param {ApiConfig} config - All request configurations
   */
  const successHandler = (res: AxiosResponse, config: ApiConfig) => {
    setData(res?.data);
    setIsPending(false);
    if (config?.displayToast) {
      pushToast(
        'success',
        config?.successMessage || res?.data?.message,
        config
      );
    }
  };

  /**
   * To handle error case of the request
   * @param {AxiosResponse} res - Axios request payload
   * @param {ApiConfig} config - All request configurations
   */
  const errorHandler = (error: ApiResponseError, config: ApiConfig) => {
    setError(error);
    setIsPending(false);
    if (config?.displayToast) {
      if (
        error &&
        error.messages &&
        error.messages[0] &&
        error.messages[0].status == 500
      ) {
        pushToast(
          'error',
          'Something went wrong please contact system admin',
          config
        );
      }
      if (
        error &&
        error.messages &&
        error.messages[0].status !== 500 &&
        error.messages[0].data &&
        error.messages[0].data.errors &&
        Object.keys(error.messages[0].data.errors).length > 0
      ) {
        error.messages[0].data.errors.map((err: string) =>
          pushToast('error', err || 'Something went wrong', config)
        );
      }
      if (
        error &&
        error.messages &&
        error.messages[0].status !== 500 &&
        error.messages[0].data &&
        error.messages[0].data.message
      ) {
        pushToast('error', error.messages[0].data.message, config);
      }
    }
  };

  /**
   * Method to handle api requests
   * @param {ApiConfig} config - All request configurations
   */
  const apiHandler = useCallback(async (config: ApiConfig) => {
    return new Promise<AxiosResponse | void>((resolve, reject) => {
      try {
        setIsPending(true);
        httpMultipart({
          url: config.url,
          method: config.method,
          data: config.data,
          params: config.params,
        })
          .then((res: AxiosResponse) => {
            successHandler(res, config);
            resolve(res?.data);
          })
          .catch((error: any) => {
            errorHandler(error, config);
            reject(error);
          });
      } catch (error) {
        reject(false);
      }
    });
  }, []);

  return { data, isPending, error, apiHandler };
}
