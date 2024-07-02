import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest, HttpResponse
} from '@angular/common/http';
import {Injectable, Provider} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {AlertPopUpService} from "../../services/pop-ups-services/alert-popup/alert-pop-up.service";
import {map} from "rxjs/operators";

@Injectable()
export class AlertPopUpInterceptorInterceptor implements HttpInterceptor {

  constructor(private alertPopUpService: AlertPopUpService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('-------> AlertPopUpInterceptorInterceptor <-------');
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log("HttpResponse event: ", event);
          if (event.body && event.body.success === null) {
            const errorMessage = event.body.error?.error_message || 'An unknown error occurred';
            this.alertPopUpService.showErrorMessage(errorMessage);
          }
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        const errorMessage = error.error?.error?.error_message || error.message || 'An unknown error occurred';
        this.alertPopUpService.showErrorMessage(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }
}

export const AlertPopUpInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AlertPopUpInterceptorInterceptor,
  multi: true
}
