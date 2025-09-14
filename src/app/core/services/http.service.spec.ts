import { TestBed } from '@angular/core/testing';
import { HttpService } from './http.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing";
import { firstValueFrom } from 'rxjs';

describe('HttpService', () => {
  const TEST_URL = 'https://www.example.com';
  let httpService: HttpService;
  let httpTesting: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    httpService = TestBed.inject(HttpService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('When a GET request is made and the response is returned successfully, it should return the response', async () => {
    // Arrange
    const httpCall = httpService.get({
      baseUrl: TEST_URL,
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
    const request = httpTesting.expectOne(TEST_URL + '/test/get?id=123456');
    request.flush({
      test: 123
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('GET');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');

    expect(response).toEqual({
      test: 123
    });
  });

  it('When a POST request is made and the response is returned successfully, it should return the response', async () => {
    // Arrange
    const httpCall = httpService.post({
      baseUrl: TEST_URL,
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
    const request = httpTesting.expectOne(TEST_URL + '/test/post?id=123456');
    request.flush({
      test: 123
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('POST');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.body).toEqual({
      testKey: 'test value'
    });

    expect(response).toEqual({
      test: 123
    });
  });

  it('When a PUT request is made and the response is returned successfully, should return the response', async () => {
    // Arrange
    const httpCall = httpService.put({
      baseUrl: TEST_URL,
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
    const request = httpTesting.expectOne(TEST_URL + '/test/put?id=123456');
    request.flush({
      test: 123
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('PUT');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.body).toEqual({
      testKey: 'test value'
    });

    expect(response).toEqual({
      test: 123
    });
  });

  it('When a PATCH request is made and the response is returned successfully, should return the response', async () => {
    // Arrange
    const httpCall = httpService.patch({
      baseUrl: TEST_URL,
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
    const request = httpTesting.expectOne(TEST_URL + '/test/patch?id=123456');
    request.flush({
      test: 123
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('PATCH');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');
    expect(request.request.body).toEqual({
      testKey: 'test value'
    });

    expect(response).toEqual({
      test: 123
    });
  });

  it('When a DELETE request is made and the response is returned successfully, should return the response', async () => {
    // Arrange
    const httpCall = httpService.delete({
      baseUrl: TEST_URL,
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
    const request = httpTesting.expectOne(TEST_URL + '/test/delete?id=123456');
    request.flush({
      test: 123
    });

    const response = await httpCallPromise;

    // Assert
    expect(request.request.method).toBe('DELETE');
    expect(request.request.headers.get('TestHeader')).toBe('test header value');

    expect(response).toEqual({
      test: 123
    });
  });

  it('When a request is made but an error occured, it should throw error', async () => {
    // Arrange
    const httpCall = httpService.get({
      baseUrl: TEST_URL
    });

    const httpCallPromise = firstValueFrom(httpCall);

    // Act
    const request = httpTesting.expectOne(TEST_URL);
    request.error(new ProgressEvent('test error'), {
      status: 500,
      statusText: 'Test server error'
    });

    try {
      await httpCallPromise;
      fail('No error is thrown');
    }
    catch { }
  });
});
