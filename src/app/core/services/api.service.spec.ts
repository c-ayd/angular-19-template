import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { API_URL } from '../injection-tokens/api-tokens';
import { AuthService } from './auth.service';

interface TestDataModel {
  intKey: number,
  stringKey: string
}

describe('ApiService', () => {
  const API_URL_VALUE = 'https://api.example.com';
  let apiService: ApiService;
  let httpTesting: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_URL, useValue: API_URL_VALUE },
        {
          provide: AuthService,
          useValue: {
            isAuthenticated: () => true,
            getTokenHeaderKey: () => 'Authorization',
            getTokenHeaderValue: () => 'Bearer test'
          }
        }
      ]
    });

    apiService = TestBed.inject(ApiService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('When a GET request is made with a data type and the response is returned successfully, should return the response in correct form', async () => {
    // Arrange
    var httpCall = apiService.get<TestDataModel>({
      routes: ['test', 'get'],
      queryStrings: {
        id: '123456'
      },
      headers: {
        TestHeader: 'test header value'
      }
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/test/get?id=123456');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      data: {
        intKey: 5,
        stringKey: 'test value'
      },
      metadata: {
        test: 123
      }
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test');

    expect(response).toEqual({
      statusCode: 200,
      isSuccess: true,
      data: {
        intKey: 5,
        stringKey: 'test value'
      },
      metadata: {
        test: 123
      }
    });
  });

  it('When a GET request is made without a data type and the response is returned successfully, should return the response in correct form', async () => {
    // Arrange
    var httpCall = apiService.get({
      routes: ['test', 'get'],
      queryStrings: {
        id: '123456'
      },
      headers: {
        TestHeader: 'test header value'
      }
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/test/get?id=123456');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      metadata: {
        test: 123
      }
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test');

    expect(response).toEqual({
      statusCode: 200,
      isSuccess: true,
      metadata: {
        test: 123
      }
    });
  });

  it('When a POST request is made with a data type and the response is returned successfully, should return the response in correct form', async () => {
    // Arrange
    var httpCall = apiService.post<TestDataModel>({
      routes: ['test', 'post'],
      queryStrings: {
        id: '123456'
      },
      headers: {
        TestHeader: 'test header value'
      },
      body: {
        testKey: 'test value'
      }
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/test/post?id=123456');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      data: {
        intKey: 5,
        stringKey: 'test value'
      },
      metadata: {
        test: 123
      }
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test');
    expect(request.request.body).toEqual({
      testKey: 'test value'
    });

    expect(response).toEqual({
      statusCode: 200,
      isSuccess: true,
      data: {
        intKey: 5,
        stringKey: 'test value'
      },
      metadata: {
        test: 123
      }
    });
  });

  it('When a POST request is made without a data type and the response is returned successfully, should return the response in correct form', async () => {
    // Arrange
    var httpCall = apiService.post({
      routes: ['test', 'post'],
      queryStrings: {
        id: '123456'
      },
      headers: {
        TestHeader: 'test header value'
      },
      body: {
        testKey: 'test value'
      }
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/test/post?id=123456');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      metadata: {
        test: 123
      }
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test');
    expect(request.request.body).toEqual({
      testKey: 'test value'
    });

    expect(response).toEqual({
      statusCode: 200,
      isSuccess: true,
      metadata: {
        test: 123
      }
    });
  });

  it('When a PUT request is made with a data type and the response is returned successfully, should return the response in correct form', async () => {
    // Arrange
    var httpCall = apiService.put<TestDataModel>({
      routes: ['test', 'put'],
      queryStrings: {
        id: '123456'
      },
      headers: {
        TestHeader: 'test header value'
      },
      body: {
        testKey: 'test value'
      }
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/test/put?id=123456');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      data: {
        intKey: 5,
        stringKey: 'test value'
      },
      metadata: {
        test: 123
      }
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test');
    expect(request.request.body).toEqual({
      testKey: 'test value'
    });

    expect(response).toEqual({
      statusCode: 200,
      isSuccess: true,
      data: {
        intKey: 5,
        stringKey: 'test value'
      },
      metadata: {
        test: 123
      }
    });
  });

  it('When a PUT request is made without a data type and the response is returned successfully, should return the response in correct form', async () => {
    // Arrange
    var httpCall = apiService.put({
      routes: ['test', 'put'],
      queryStrings: {
        id: '123456'
      },
      headers: {
        TestHeader: 'test header value'
      },
      body: {
        testKey: 'test value'
      }
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/test/put?id=123456');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      metadata: {
        test: 123
      }
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test');
    expect(request.request.body).toEqual({
      testKey: 'test value'
    });

    expect(response).toEqual({
      statusCode: 200,
      isSuccess: true,
      metadata: {
        test: 123
      }
    });
  });

  it('When a PATCH request is made with a data type and the response is returned successfully, should return the response in correct form', async () => {
    // Arrange
    var httpCall = apiService.patch<TestDataModel>({
      routes: ['test', 'patch'],
      queryStrings: {
        id: '123456'
      },
      headers: {
        TestHeader: 'test header value'
      },
      body: {
        testKey: 'test value'
      }
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/test/patch?id=123456');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      data: {
        intKey: 5,
        stringKey: 'test value'
      },
      metadata: {
        test: 123
      }
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('PATCH');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test');
    expect(request.request.body).toEqual({
      testKey: 'test value'
    });

    expect(response).toEqual({
      statusCode: 200,
      isSuccess: true,
      data: {
        intKey: 5,
        stringKey: 'test value'
      },
      metadata: {
        test: 123
      }
    });
  });

  it('When a PATCH request is made without a data type and the response is returned successfully, should return the response in correct form', async () => {
    // Arrange
    var httpCall = apiService.patch({
      routes: ['test', 'patch'],
      queryStrings: {
        id: '123456'
      },
      headers: {
        TestHeader: 'test header value'
      },
      body: {
        testKey: 'test value'
      }
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/test/patch?id=123456');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      metadata: {
        test: 123
      }
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('PATCH');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test');
    expect(request.request.body).toEqual({
      testKey: 'test value'
    });

    expect(response).toEqual({
      statusCode: 200,
      isSuccess: true,
      metadata: {
        test: 123
      }
    });
  });

  it('When a DELETE request is made with a data type and the response is returned successfully, should return the response in correct form', async () => {
    // Arrange
    var httpCall = apiService.delete<TestDataModel>({
      routes: ['test', 'delete'],
      queryStrings: {
        id: '123456'
      },
      headers: {
        TestHeader: 'test header value'
      }
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/test/delete?id=123456');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      data: {
        intKey: 5,
        stringKey: 'test value'
      },
      metadata: {
        test: 123
      }
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test');

    expect(response).toEqual({
      statusCode: 200,
      isSuccess: true,
      data: {
        intKey: 5,
        stringKey: 'test value'
      },
      metadata: {
        test: 123
      }
    });
  });

  it('When a DELETE request is made without a data type and the response is returned successfully, should return the response in correct form', async () => {
    // Arrange
    var httpCall = apiService.delete({
      routes: ['test', 'delete'],
      queryStrings: {
        id: '123456'
      },
      headers: {
        TestHeader: 'test header value'
      }
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(API_URL_VALUE + '/test/delete?id=123456');
    request.flush({
      statusCode: 200,
      isSuccess: true,
      metadata: {
        test: 123
      }
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.headers.get('Authorization')).toBe('Bearer test');

    expect(response).toEqual({
      statusCode: 200,
      isSuccess: true,
      metadata: {
        test: 123
      }
    });
  });
});
