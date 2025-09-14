import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpRequestParams } from '../models/http-request-params.model';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private httpClient: HttpClient) { }

  get<T>(requestParams: Partial<HttpRequestParams>): Observable<T> {
    const params = this.buildRequestParams(requestParams);
    return this.httpClient.get<T>(params.url, {
      headers: params.headers,
      params: params.params,
      withCredentials: requestParams.withCredentials ?? false
    });
  }

  post<T>(requestParams: Partial<HttpRequestParams>): Observable<T> {
    const params = this.buildRequestParams(requestParams);
    return this.httpClient.post<T>(params.url, requestParams.body, {
      headers: params.headers,
      params: params.params,
      withCredentials: requestParams.withCredentials ?? false
    });
  }

  put<T>(requestParams: Partial<HttpRequestParams>): Observable<T> {
    const params = this.buildRequestParams(requestParams);
    return this.httpClient.put<T>(params.url, requestParams.body, {
      headers: params.headers,
      params: params.params,
      withCredentials: requestParams.withCredentials ?? false
    });
  }

  patch<T>(requestParams: Partial<HttpRequestParams>): Observable<T> {
    const params = this.buildRequestParams(requestParams);
    return this.httpClient.patch<T>(params.url, requestParams.body, {
      headers: params.headers,
      params: params.params,
      withCredentials: requestParams.withCredentials ?? false
    });
  }

  delete<T>(requestParams: Partial<HttpRequestParams>): Observable<T> {
    const params = this.buildRequestParams(requestParams);
    return this.httpClient.delete<T>(params.url, {
      headers: params.headers,
      params: params.params,
      withCredentials: requestParams.withCredentials ?? false
    });
  }

  private buildRequestParams(requestParams: Partial<HttpRequestParams>): {
    url: string,
    headers: HttpHeaders | undefined,
    params: HttpParams | undefined
  } {
    if (requestParams.baseUrl == undefined)
      throw new Error('The base URL is not given');

    // Build URL
    let url: string = requestParams.baseUrl;
    if (requestParams.routes != undefined) {
      url += `/${requestParams.routes.join('/')}`;
    }

    // Build headers
    let headers: HttpHeaders | undefined = undefined;
    if (requestParams.headers != undefined) {
      headers = new HttpHeaders();
      Object.entries(requestParams.headers).forEach(([key, value]) =>
      {
        if (value) {
          headers = headers!.append(key, value);
        }
      });
    }

    // Build query string
    let params: HttpParams | undefined = undefined;
    if (requestParams.queryStrings != undefined) {
      params = new HttpParams();
      Object.entries(requestParams.queryStrings).forEach(([key, value]) =>
      {
        if (value) {
          params = params!.append(key, value);
        }
      });
    }

    return { url, headers, params };
  }
}
