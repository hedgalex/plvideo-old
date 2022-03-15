export interface IConfig {
  getBaseURL: (service: string) => string,
  getMoviesPath: (service: string) => string,
  getTVShowsPath: (service: string) => string,
  getSearchURL: (service: string) => string,
  getMoviesURL: (service: string) => string,
  getTVShowsURL: (service: string) => string,
  getCookies: (service: string) => string,
  getHeaders: (service: string) => string,
  getDownloadInterval: () => number,
  getDownloadTimeout: () => number,
  getKnexConfig: () => any,
}