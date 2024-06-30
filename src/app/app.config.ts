import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient} from "@angular/common/http";
import {provideCharts, withDefaultRegisterables} from "ng2-charts";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes),
    provideCharts(withDefaultRegisterables()),
    provideAnimations()
  ]
};


export const debug_environment = {
  production: false,
  apiUrl: 'http://localhost:8000',
  apiVersion: 'api/v1',
  webSocketUrl: 'ws://localhost:8000'
};

export const production_environment = {
  production: true,
  apiUrl: 'http://fedora-vpn-server.duckdns.org:8000',
  apiVersion: 'api/v1',
  webSocketUrl: 'ws://fedora-vpn-server.duckdns.org:8000'
};

export const environment = production_environment;
