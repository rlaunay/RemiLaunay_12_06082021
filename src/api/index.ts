import HttpClient from './HttpClient';
import User from '../models/user';
import Activity from '../models/activity';
import AverageSessions from '../models/averageSessions';
import Performance from '../models/performance';

/**
 * @param {string} baseUrl
 * @param {string} langCode
 */
class ApiClient extends HttpClient {
  constructor(baseUrl: string, langCode: string) {
    super({
      baseUrl,
      headers: {
        lang: langCode,
      },
    });
  }

  /**
   * Get the user information form the API
   */
  get user() {
    return {
      get: (id: number) => this.get<{ data: User }>(`/user/${id}`),
    };
  }

  /**
   * Get the user activity information form the API
   */
  get activity() {
    return {
      get: (id: number) => this.get<{ data: Activity }>(`/user/${id}/activity`),
    };
  }

  /**
   * Get the user average sessions information form the API
   */
  get averageSessions() {
    return {
      get: (id: number) => this.get<{ data: AverageSessions }>(`/user/${id}/average-sessions`),
    };
  }

  /**
   * Get the user performance information form the API
   */
  get performance() {
    return {
      get: (id: number) => this.get<{ data: Performance }>(`/user/${id}/performance`),
    };
  }
}

export default new ApiClient('http://localhost:8080', 'fr');
