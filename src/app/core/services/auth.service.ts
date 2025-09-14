import { Inject, Injectable, signal } from '@angular/core';
import { HttpService } from './http.service';
import { JwtBearer } from '../models/jwt-bearer.model';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { API_URL } from '../injection-tokens/api-tokens';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TokenStorageKey = 'jwt-bearer';

  private _isAuthenticated = signal(false);
  public isAuthenticated = this._isAuthenticated.asReadonly();
  private _roles: string[] = [];

  constructor(private httpService: HttpService,
    @Inject(API_URL) private apiUrl: string
  ) { }

  setJwtBearerToken(tokenValue: string, roles: string[] | undefined) {
    localStorage.setItem(this.TokenStorageKey, tokenValue);
    this._isAuthenticated.set(true);

    if (roles != undefined) {
      this._roles = roles;
    }
  }

  getJwtBearerToken(): string | null {
    return localStorage.getItem(this.TokenStorageKey);
  }

  clearJwtBearerToken(): void {
    localStorage.removeItem(this.TokenStorageKey);
    this._isAuthenticated.set(false);
    this._roles = [];
  }

  hasRole(role: string): boolean {
    return this._roles.includes(role);
  }

  refreshJwtBearerToken(): Observable<void> {
    return this.httpService.post<ApiResponse<JwtBearer>>({
      baseUrl: this.apiUrl,
      routes: ['auth', 'refresh-token'],  // NOTE: Depending on your refresh token endpoint, this needs to be changed
      withCredentials: true
    }).pipe(
      map(response => {
        if (response && response.data && response.data.accessToken) {
          this.setJwtBearerToken(response.data.accessToken, response.metadata?.['roles']);
        }
        else {
          this.clearJwtBearerToken();
        }
      }),
      catchError(error => {
        if (error.error.statusCode !== undefined && error.error.isSuccess !== undefined) {
          this.clearJwtBearerToken();
        }

        return throwError(() => error);
      })
    );
  }
}
