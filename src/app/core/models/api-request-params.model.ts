import { HttpRequestParams } from "./http-request-params.model"

export interface ApiRequestParams extends Omit<HttpRequestParams, 'baseUrl'> {
}
