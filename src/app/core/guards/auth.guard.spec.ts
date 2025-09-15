import { TestBed } from '@angular/core/testing';
import { AuthService } from '../services/auth.service';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['isAuthenticated']);

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceSpy }
      ]
    });
  });

  it('When logged in, it should return true', () => {
    // Arrange
    authServiceSpy.isAuthenticated.and.returnValue(true);

    // Act
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    // Assert
    expect(result).toBeTrue();
  });

  it('When not logged in, it should return false', () => {
    // Arrange
    authServiceSpy.isAuthenticated.and.returnValue(false);

    // Act
    const result = TestBed.runInInjectionContext(() => authGuard({} as any, {} as any));

    // Assert
    expect(result).toBeFalse();
  });
});
