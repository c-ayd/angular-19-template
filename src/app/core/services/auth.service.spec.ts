import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { firstValueFrom } from 'rxjs';
import { API_URL } from '../injection-tokens/api-tokens';

describe('AuthService', () => {
  const API_URL_VALUE = 'https://api.example.com';
  let authService: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: API_URL_VALUE }
      ]
    });

    authService = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('When JWT Bearer token is set; it should update isAuthenticated, save the token to the local storage and add the roles', () => {
    // Act
    authService.setJwtBearerToken('test', ['TestRole']);

    // Assert
    expect(authService.isAuthenticated()).toBeTrue();
    expect(authService.getJwtBearerToken()).toEqual('test');
    expect(localStorage.getItem('jwt-bearer')).toEqual('test');
    expect(authService.hasRole('TestRole')).toBeTrue();
  });

  it('When JWT Bearer token is cleared; it should update isAuthenticated, remove the token from the local storage and remove the roles', () => {
    // Arrange
    authService.setJwtBearerToken('test', ['TestRole']);

    // Act
    authService.clearJwtBearerToken();

    // Assert
    expect(authService.isAuthenticated()).toBeFalse();
    expect(authService.getJwtBearerToken()).toBeNull();
    expect(localStorage.getItem('jwt-bearer')).toBeNull();
    expect(authService.hasRole('TestRole')).toBeFalse();
  });

  it('When JWT Bearer token is refreshed successfully; it should update isAuthenticated, save the token to the local storage and add the roles', async () => {
    // Arrange
    const httpCall = authService.refreshJwtBearerToken();
    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/auth/refresh-token');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      data: {
        accessToken: 'test',
        refreshToken: 'test refresh token',
        refreshTokenExpirationDate: 'test date'
      },
      metadata: {
        roles: ['TestRole']
      }
    });

    await httpCallPromise;

    // Assert
    expect(authService.isAuthenticated()).toBeTrue();
    expect(authService.getJwtBearerToken()).toEqual('test');
    expect(localStorage.getItem('jwt-bearer')).toEqual('test');
    expect(authService.hasRole('TestRole')).toBeTrue();
  });

  it('When JWT Bearer token is not refreshed successfully; it should update isAuthenticated, remove the token to the local storage and remove the roles', async () => {
    // Arrange
    authService.setJwtBearerToken('test', ['TestRole']);

    const httpCall = authService.refreshJwtBearerToken();
    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/auth/refresh-token');
    request.flush({
      statusCode: 500,
      isSuccess: false
    }, {
      status: 500,
      statusText: 'Test server error'
    });

    try {
      await httpCallPromise;
    }
    catch { }

    // Assert
    expect(authService.isAuthenticated()).toBeFalse();
    expect(authService.getJwtBearerToken()).toBeNull();
    expect(localStorage.getItem('jwt-bearer')).toBeNull();
    expect(authService.hasRole('TestRole')).toBeFalse();
  });

  it('When an error occurs while refreshing JWT Bearer token, it should update not change anything', async () => {
    // Arrange
    authService.setJwtBearerToken('test', ['TestRole']);

    const httpCall = authService.refreshJwtBearerToken();
    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/auth/refresh-token');
    request.error(new ProgressEvent('Test error'), {
      status: 500,
      statusText: 'Test server error'
    });

    try {
      await httpCallPromise;
    }
    catch { }

    // Assert
    expect(authService.isAuthenticated()).toBeTrue();
    expect(authService.getJwtBearerToken()).toEqual('test');
    expect(localStorage.getItem('jwt-bearer')).toEqual('test');
    expect(authService.hasRole('TestRole')).toBeTrue();
  });
});
