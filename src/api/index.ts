import HttpClient from './HttpClient';

export default class ApiClient extends HttpClient {
  constructor(baseUrl: string, langCode: string) {
    super({
      baseUrl,
      headers: {
        lang: langCode,
      },
    });
  }

  get user() {
    return {
      get: (id: number) => this.get(`/users/${id}`),
    };
  }

  get activity() {
    return {
      get: (id: number) => this.get(`/user/${id}/activity`),
    };
  }

  get averageSessions() {
    return {
      get: (id: number) => this.get(`/user/${id}/average-sessions`),
    };
  }

  get performancce() {
    return {
      get: (id: number) => this.get(`/user/${id}/performance`),
    };
  }
}
