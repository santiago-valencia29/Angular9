import { TestBed } from '@angular/core/testing';

import { AuthMeanGuard } from './auth-mean.guard';

describe('AuthMeanGuard', () => {
  let guard: AuthMeanGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthMeanGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
