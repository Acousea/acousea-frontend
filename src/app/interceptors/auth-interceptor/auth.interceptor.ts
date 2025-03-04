import {HTTP_INTERCEPTORS, HttpInterceptorFn} from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  console.log("Auth interceptor triggered ------------------------------------")
  const authReq = req.clone({
    withCredentials: true
  });
  return next(authReq);
};


export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useValue: authInterceptor,
  multi: true
};
