/**
 * NOTE: This response is only a placeholder. Depending on if you use JWT bearer token and
 * the response type from the endpoint refreshing the token, you can change this accordingly.
 */
export interface JwtBearer {
  accessToken: string,
  refreshToken: string,
  refreshTokenExpirationDate: string
}