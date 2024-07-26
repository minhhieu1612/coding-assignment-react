type BaseRequestType = RequestInit & { baseUrl?: string };

export type BaseResponseType<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export const DEFAULT_BASE_URL = 'http://localhost:4200/api';

const DEFAULT_REQUEST_CONFIG: BaseRequestType = {
  headers: {
    Accept: 'application/json, text/html',
    'User-Agent': navigator.userAgent,
  },
  method: 'GET',
  cache: 'default',
  credentials: 'same-origin',
  baseUrl: DEFAULT_BASE_URL,
};

type QueryParamsType = {
  [key: string]: string;
};

class Repository {
  private _config: BaseRequestType;

  constructor(config?: BaseRequestType) {
    this._config = { ...DEFAULT_REQUEST_CONFIG, ...config };
  }

  private async _execute<T>(
    endpoint: string,
    query?: QueryParamsType,
    options?: BaseRequestType
  ): Promise<BaseResponseType<T>> {
    const params =
      query !== undefined
        ? Object.entries(query).reduce(
            (acc, [key, value], idx) =>
              `${acc}${idx === 0 ? '?' : ''}${key}=${value}&`,
            ''
          )
        : '';

    const request = new Request(
      `${this._config.baseUrl}/${endpoint}${params}`,
      {
        ...this._config,
        ...options,
      }
    );

    try {
      const response: Response = await fetch(request);
      const data = response.status !== 204 ? await response.json() : {};

      if (response.status >= 400) {
        return {
          success: false,
          error: data.message,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error: unknown) {
      return {
        success: false,
        error: (error as Error).message,
      };
    }
  }

  async get<T>(endpoint: string, query?: QueryParamsType) {
    return await this._execute<T>(endpoint, query);
  }

  async post<T>(endpoint: string, body: string, query?: QueryParamsType) {
    return await this._execute<T>(endpoint, query, { body, method: 'POST' });
  }

  async put<T>(endpoint: string, body?: string, query?: QueryParamsType) {
    return await this._execute<T>(endpoint, query, {
      body: body || '',
      method: 'PUT',
    });
  }

  async delete<T>(endpoint: string, query?: QueryParamsType) {
    return await this._execute<T>(endpoint, query, { method: 'DELETE' });
  }
}

export default Repository;
