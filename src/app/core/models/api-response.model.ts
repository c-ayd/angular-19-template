/**
 * NOTE: This response is only a placeholder. Depending on if you have a response structure
 * returned from your backend, you can change this accordingly.
 */
export interface ApiResponse<T = undefined> {
  statusCode: number,
  isSuccess: boolean,
  data?: T,
  errors?: { [key: string]: string }[] | string | string[],
  metadata?: { [key: string] : any }
}