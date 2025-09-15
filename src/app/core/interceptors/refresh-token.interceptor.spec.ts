import { TestBed } from '@angular/core/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { AuthService } from '../services/auth.service';
import { refreshTokenInterceptor } from './refresh-token.interceptor';
import { API_URL } from '../injection-tokens/api-tokens';
import { firstValueFrom, of } from 'rxjs';
import { NotificationService } from '../services/notification.service';

describe('refreshTokenInterceptor', () => {
  const API_URL_VALUE = 'https://api.example.com';
  const TEST_URL = 'https://www.example.com';
  let httpTesting: HttpTestingController;
  let httpClient: HttpClient;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['refreshJwtBearerToken', 'getTokenHeaderKey', 'getTokenHeaderValue']);

    authServiceSpy.refreshJwtBearerToken.and.returnValue(of(undefined));
    authServiceSpy.getTokenHeaderKey.and.returnValue('Authorization');
    authServiceSpy.getTokenHeaderValue.and.returnValue('Bearer test2');

    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(
          withInterceptors([refreshTokenInterceptor])
        ),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: API_URL, useValue: API_URL_VALUE },
        {
          provide: NotificationService,
          useValue: {
            showNotification: () => {}
          }
        }
      ]
    });

    httpTesting = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  it('When the bearer token is not present in the header and the request is not for the API_URL, it should not intercept', async () => {
    // Arrange
    const httpCallPromise = firstValueFrom(httpClient.get(TEST_URL));
    
    // Act
    const request = httpTesting.expectOne(TEST_URL);
    request.flush({});

    await httpCallPromise;

    // Assert
    expect(authServiceSpy.refreshJwtBearerToken).not.toHaveBeenCalled();
  });

  it('When the bearer token is not present in the header and the response is 401 or 403, it should request a new token', async () => {
    // Arrange
    const httpCallPromise = firstValueFrom(httpClient.get(API_URL_VALUE));

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE);
    request.flush({}, {
      status: 401,
      statusText: 'Unauthorized'
    });

    const retriedRequest = httpTesting.expectOne(API_URL_VALUE);
    retriedRequest.flush({
      test: 123
    });

    const response = await httpCallPromise;

    // Assert
    expect(authServiceSpy.refreshJwtBearerToken).toHaveBeenCalled();

    expect(retriedRequest.request.headers.get('Authorization')).toBe('Bearer test2');

    expect(response).toEqual({
      test: 123
    });
  });

  it('When the bearer token is present in the header and the response is successful, it should return the response', async () => {
    // Arrange
    const httpCallPromise = firstValueFrom(httpClient.get(API_URL_VALUE, {
      headers: {
        'Authorization': 'Bearer test'
      }
    }));

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE);
    request.flush({
      test: 123
    });

    const response = await httpCallPromise;

    // Assert
    expect(authServiceSpy.refreshJwtBearerToken).not.toHaveBeenCalled();

    expect(request.request.headers.get('Authorization')).toBe('Bearer test');

    expect(response).toEqual({
      test: 123
    });
  });

  it('When the bearer token is present in the header and the response is 401 or 403, it should request a new token', async () => {
    // Arrange
    const httpCallPromise = firstValueFrom(httpClient.get(API_URL_VALUE, {
      headers: {
        'Authorization': 'Bearer test'
      }
    }));

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE);
    request.flush({}, {
      status: 401,
      statusText: 'Unauthorized'
    });

    const retriedRequest = httpTesting.expectOne(API_URL_VALUE);
    retriedRequest.flush({
      test: 123
    });

    const response = await httpCallPromise;

    // Assert
    expect(authServiceSpy.refreshJwtBearerToken).toHaveBeenCalled();

    expect(request.request.headers.get('Authorization')).toBe('Bearer test');
    expect(retriedRequest.request.headers.get('Authorization')).toBe('Bearer test2');

    expect(response).toEqual({
      test: 123
    });
  });
});
