import { TestBed } from '@angular/core/testing';
import { LoadingInterceptor } from './loading-animation.interceptor';
import { LoadingAnimationService } from '../../services/loading-animation-service/loading-animation.service';

describe('LoadingInterceptor', () => {
  let interceptor: LoadingInterceptor;

  beforeEach(() => {
    const loadingServiceSpy = jasmine.createSpyObj('LoadingAnimationService', ['show', 'hide']);

    TestBed.configureTestingModule({
      providers: [
        LoadingInterceptor,
        { provide: LoadingAnimationService, useValue: loadingServiceSpy }
      ]
    });

    interceptor = TestBed.inject(LoadingInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
