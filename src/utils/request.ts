/**
 * Axios 请求封装
 * 支持 SIWE 签名认证和 JWT token 认证
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { BASE_URL } from '@/config/configs';

// ==================== 类型定义 ====================

/**
 * API 统一响应格式
 */
export interface ApiResponse<T = any> {
  data: T;
  code: number;
}

/**
 * API 错误响应格式
 */
export interface ApiError {
  error: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
}

/**
 * SIWE 认证请求配置
 */
export interface SiweAuthConfig {
  message: string;    // SIWE 消息字符串
  signature: string;  // 签名 (hex 格式)
}

/**
 * 扩展的请求配置
 */
export interface RequestConfig extends AxiosRequestConfig {
  siweAuth?: SiweAuthConfig;  // SIWE 签名认证（仅用于登录）
  skipAuth?: boolean;          // 跳过 JWT token 认证（用于公开端点）
}

// ==================== 环境变量配置 ====================

const API_BASE_URL = BASE_URL;
const API_TIMEOUT = 30000; // 30 秒超时

// ==================== Token 管理 ====================

/**
 * Token 存储键名
 */
const TOKEN_KEY = 'jwt_token';

/**
 * 获取存储的 JWT token
 */
export const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return sessionStorage.getItem(TOKEN_KEY);
};

/**
 * 保存 JWT token
 */
export const setToken = (token: string): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.setItem(TOKEN_KEY, token);
};

/**
 * 清除 JWT token
 */
export const removeToken = (): void => {
  if (typeof window === 'undefined') return;
  sessionStorage.removeItem(TOKEN_KEY);
};

// ==================== Axios 实例创建 ====================

/**
 * 创建 Axios 实例
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: API_BASE_URL,
    timeout: API_TIMEOUT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  // ==================== 请求拦截器 ====================
  instance.interceptors.request.use(
    (config) => {
      const customConfig = config as RequestConfig;

      // 1. SIWE 签名认证（仅用于 POST /api/v1/users）
      if (customConfig.siweAuth) {
        config.headers['X-Message'] = customConfig.siweAuth.message;
        config.headers['X-Signature'] = customConfig.siweAuth.signature;
      }

      // 2. JWT Token 认证（除非明确跳过）
      if (!customConfig.skipAuth && !customConfig.siweAuth) {
        const token = getToken();
        if (token) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // ==================== 响应拦截器 ====================
  instance.interceptors.response.use(
    (response: AxiosResponse<ApiResponse>) => {
      // 成功响应：直接返回 data 字段
      return response.data as any;
    },
    (error: AxiosError<ApiError>) => {
      // 错误处理
      if (error.response) {
        const { status, data } = error.response;

        // 401 Unauthorized - Token 过期或无效
        if (status === 401) {
          console.warn('Authentication failed. Token may be expired.');
          removeToken(); // 清除过期 token

          // 触发全局事件，通知应用重定向到登录页 
          if (typeof window !== 'undefined') {
            window.dispatchEvent(new Event('auth:token-expired'));
          }
        }

        // 返回格式化的错误信息
        return Promise.reject({
          status,
          code: data?.error?.code || 'UNKNOWN_ERROR',
          message: data?.error?.message || 'An unknown error occurred',
          details: data?.error?.details || [],
        });
      }

      // 网络错误或请求超时
      if (error.code === 'ECONNABORTED') {
        return Promise.reject({
          status: 0,
          code: 'TIMEOUT',
          message: 'Request timeout. Please try again.',
        });
      }

      if (!error.response) {
        return Promise.reject({
          status: 0,
          code: 'NETWORK_ERROR',
          message: 'Network error. Please check your connection.',
        });
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

// ==================== 导出的 Axios 实例 ====================

export const axiosInstance = createAxiosInstance();

// ==================== 通用请求方法 ====================

/**
 * GET 请求
 */
export const get = <T = any>(
  url: string,
  config?: RequestConfig
): Promise<ApiResponse<T>> => {
  return axiosInstance.get<any, ApiResponse<T>>(url, config);
};

/**
 * POST 请求
 */
export const post = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<ApiResponse<T>> => {
  return axiosInstance.post<any, ApiResponse<T>>(url, data, config);
};

/**
 * PUT 请求
 */
export const put = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<ApiResponse<T>> => {
  return axiosInstance.put<any, ApiResponse<T>>(url, data, config);
};

/**
 * DELETE 请求
 */
export const del = <T = any>(
  url: string,
  config?: RequestConfig
): Promise<ApiResponse<T>> => {
  return axiosInstance.delete<any, ApiResponse<T>>(url, config);
};

/**
 * PATCH 请求
 */
export const patch = <T = any>(
  url: string,
  data?: any,
  config?: RequestConfig
): Promise<ApiResponse<T>> => {
  return axiosInstance.patch<any, ApiResponse<T>>(url, data, config);
};

// ==================== 默认导出 ====================

export default {
  get,
  post,
  put,
  delete: del,
  patch,
  axiosInstance,
  getToken,
  setToken,
  removeToken,
};
