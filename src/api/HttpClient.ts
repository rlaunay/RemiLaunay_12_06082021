type Headers = {
  [key: string]: string;
};

type Body = {
  [key: string]: unknown;
};

type Params = {
  baseUrl?: string;
  headers?: Headers;
};

type RequestInit = {
  method: 'GET' | 'POST' | 'DELETE';
  [key: string]: string;
};

export default class HttpClient {
  private baseUrl: string;
  private headers: Headers;

  constructor(options: Params = {}) {
    this.baseUrl = options.baseUrl || '';
    this.headers = options.headers || {};
  }

  setHeader(key: string, value: string) {
    this.headers[key] = value;
    return this;
  }

  private async fetchJSON<T = any>(endpoint: string, options: RequestInit): Promise<T> {
    const res = await fetch(this.baseUrl + endpoint, {
      ...options,
      headers: this.headers,
    });

    if (!res.ok) throw new Error(res.statusText);

    if (res.status !== 204) return res.json();

    return undefined as any;
  }

  get(endpoint: string, options = {}) {
    return this.fetchJSON(endpoint, {
      ...options,
      method: 'GET',
    });
  }

  post(endpoint: string, body: Body, options = {}) {
    return this.fetchJSON(endpoint, {
      ...options,
      body: JSON.stringify(body),
      method: 'POST',
    });
  }

  delete(endpoint: string, options = {}) {
    return this.fetchJSON(endpoint, {
      ...options,
      method: 'DELETE',
    });
  }
}
