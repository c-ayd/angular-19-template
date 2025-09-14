import { Inject, Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { API_URL } from '../injection-tokens/api-tokens';
import { HttpRequestParams } from '../models/http-request-params.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { AuthService } from './auth.service';
import { ApiRequestParams } from '../models/api-request-params.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly AuthorizationHeaderKey = 'Authorization';
  private readonly TokenType = 'Bearer ';

  constructor(private httpService: HttpService,
    private authService: AuthService,
    @Inject(API_URL) private apiUrl: string
  ) { }

  get<T = undefined>(requestParams: Partial<ApiRequestParams>): Observable<ApiResponse<T>> {
    const params = this.buildRequestParams(requestParams);
    return this.httpService.get<ApiResponse<T>>(params);
  }

  post<T = undefined>(requestParams: Partial<ApiRequestParams>): Observable<ApiResponse<T>> {
    const params = this.buildRequestParams(requestParams);
    return this.httpService.post<ApiResponse<T>>(params);
  }

  put<T = undefined>(requestParams: Partial<ApiRequestParams>): Observable<ApiResponse<T>> {
    const params = this.buildRequestParams(requestParams);
    return this.httpService.put<ApiResponse<T>>(params);
  }
  
  patch<T = undefined>(requestParams: Partial<ApiRequestParams>): Observable<ApiResponse<T>> {
    const params = this.buildRequestParams(requestParams);
    return this.httpService.patch<ApiResponse<T>>(params);
  }

  delete<T = undefined>(requestParams: Partial<ApiRequestParams>): Observable<ApiResponse<T>> {
    const params = this.buildRequestParams(requestParams);
    return this.httpService.delete<ApiResponse<T>>(params);
  }

  private buildRequestParams(requestParams: Partial<ApiRequestParams>): Partial<HttpRequestParams> {
    let request: Partial<HttpRequestParams> = {
      baseUrl: this.apiUrl,
      routes: requestParams.routes,
      queryStrings: requestParams.queryStrings,
      headers: requestParams.headers,
      body: requestParams.body,
      withCredentials: requestParams.withCredentials
    };

    if (this.authService.isAuthenticated()) {
      if (request.headers == undefined) {
        request.headers = {};
      }

      request.headers[this.AuthorizationHeaderKey] = this.TokenType + this.authService.getJwtBearerToken();
    }

    return request;
  }
}
