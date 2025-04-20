import {
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Injectable, Provider} from "@angular/core";
import {catchError, Observable, throwError} from "rxjs";
import {map} from "rxjs/operators";
import {
  FlushRequestQueuePopupService
} from "@/app/services/pop-ups/flush-request-queue-popup/flush-request-queue-popup.service";
import {NotificationService} from "@/app/services/real-time/notification-service/notification.service";
import {Notification} from "@/app/global-interfaces/notification/notification.interface";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

  constructor(private notificationService: NotificationService,
              private flushRequestQueueService: FlushRequestQueuePopupService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('-------> AlertPopUpInterceptorInterceptor <-------');
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (!(event instanceof HttpResponse)) {
          return event;
        }

        if (!(event.body && event.body.success === null)) {
          return event;
        }

        const error = event.body.error;
        if (error && error.error_code === 403) { // 403 - Forbidden (message queue has previous request)
          this.flushRequestQueueService.showPopUp();
        } else {
          const errorMessage = event.body.error?.error_message || 'An unknown error occurred';
          this.notificationService.pushNotification(Notification.error(errorMessage));
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.error('Request failed:', error);
        const errorMessage = error.error || error.message || 'An unknown error occurred';
        const errorCode = error.status + " " + error.statusText;
        const finalErrorMessage = errorCode + " " + errorMessage;
        console.warn("AlertPopUpInterceptor -> error", finalErrorMessage);
        return throwError(() => new Error(finalErrorMessage));
      })
    );
  }
}

export const AlertPopUpInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true
}
