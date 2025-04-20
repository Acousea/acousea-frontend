import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection, isDevMode} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';

import {routes} from './routes/app.routes';
import {provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi} from "@angular/common/http";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";
import {provideAnimations} from "@angular/platform-browser/animations";
import {
  AlertPopUpInterceptorProvider
} from "@/app/interceptors/http-error-interceptor/http-error-interceptor.interceptor";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {LoadingInterceptorProvider} from "./interceptors/loading-animation-interceptor/loading-animation.interceptor";
import {TranslateModule} from "@ngx-translate/core";
import {provideTranslation} from "./translation.provider";
import {authInterceptor} from "./interceptors/auth-interceptor/auth.interceptor";
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch(), withInterceptorsFromDi(),
      withInterceptors([authInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideCharts(withDefaultRegisterables()),
    provideAnimations(), provideAnimationsAsync(),
    importProvidersFrom(
      TranslateModule.forRoot(provideTranslation()),
      TranslateModule.forChild(provideTranslation())
    ),
    AlertPopUpInterceptorProvider,
    LoadingInterceptorProvider,

  ]
};


