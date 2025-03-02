import {ApplicationConfig, importProvidersFrom, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHttpClient, withFetch, withInterceptorsFromDi} from "@angular/common/http";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";
import {provideAnimations} from "@angular/platform-browser/animations";
import {
  AlertPopUpInterceptorProvider
} from "./interceptors/alert-pop-up-interceptor/alert-pop-up-interceptor.interceptor";
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {LoadingInterceptorProvider} from "./interceptors/loading-animation-interceptor/loading-animation.interceptor";
import {TranslateModule} from "@ngx-translate/core";
import {provideTranslation} from "./translation.provider";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({eventCoalescing: true}),
    provideHttpClient(withFetch(), withInterceptorsFromDi()),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideAnimations(), provideAnimationsAsync(),
    importProvidersFrom(
      TranslateModule.forRoot(provideTranslation()),
      TranslateModule.forChild(provideTranslation())
    ),
    AlertPopUpInterceptorProvider,
    LoadingInterceptorProvider
  ]
};


