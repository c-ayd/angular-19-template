export interface HttpRequestParams {
  baseUrl: string,
  routes: string[],
  queryStrings: { [key: string]: string | number | boolean | null }
  headers: { [key: string]: string },
  body: any,
  withCredentials: boolean
}
