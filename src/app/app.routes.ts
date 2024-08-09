import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./sites/main-layout/main-layout.component";
import {MapSiteComponent} from "./sites/map-site/map-site.component";
import {SummarySiteComponent} from "./sites/summary-site/summary-site.component";
import {SystemInfoSiteComponent} from "./sites/system-info-site/system-info-site.component";
import {HistorySiteComponent} from "./sites/history-site/history-site.component";
import {PamSystemConfigComponent} from "./sites/configuration-site/pam-system-config/pam-system-config.component";
import {
  ControlSystemConfigComponent
} from "./sites/configuration-site/control-system-config/control-system-config.component";
import {StreamingConfigComponent} from "./sites/configuration-site/streaming-config/streaming-config.component";
import {UserProfileSiteComponent} from "./sites/users/user-profile-site/user-profile-site.component";
import {NotAvailableSiteComponent} from "./sites/not-available-site/not-available-site.component";
import {LoginSiteComponent} from "./sites/users/login-site/login-site.component";
import {RegisterSiteComponent} from "./sites/users/register-site/register-site.component";
import {AuthGuard} from "./guard/AuthGuard/authGuard";
import {AppRoutePaths} from "./app.route.paths";



export const routes: Routes = [
  { path: '', redirectTo: AppRoutePaths.summary, pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      { path: AppRoutePaths.summary, component: SummarySiteComponent },
      { path: AppRoutePaths.map, component: MapSiteComponent },
      { path: AppRoutePaths.history.base, redirectTo: AppRoutePaths.history.iridiumMessages, pathMatch: 'full' },
      {
        path: AppRoutePaths.history.base, children: [
          { path: 'iridium-messages', component: HistorySiteComponent },
          { path: 'control-system', component: HistorySiteComponent },
          { path: 'pam-system', component: HistorySiteComponent },
        ]
      },
      { path: AppRoutePaths.configuration.base, redirectTo: AppRoutePaths.configuration.streaming, pathMatch: 'full' },
      {
        path: AppRoutePaths.configuration.base, children: [
          { path: 'streaming', component: StreamingConfigComponent },
          { path: 'control-system', component: ControlSystemConfigComponent },
          { path: 'pam-system', component: PamSystemConfigComponent },
        ]
      },
      { path: AppRoutePaths.systemInfo, component: SystemInfoSiteComponent },
    ],
  },
  { path: AppRoutePaths.user.base, redirectTo: AppRoutePaths.user.profile, pathMatch: 'full' },
  {
    path: AppRoutePaths.user.base,
    canActivate: [AuthGuard],
    children: [
      { path: 'profile', component: UserProfileSiteComponent },
    ]
  },
  { path: AppRoutePaths.auth.base, redirectTo: AppRoutePaths.auth.login, pathMatch: 'full' },
  {
    path: AppRoutePaths.auth.base, children: [
      { path: 'login', component: LoginSiteComponent },
      { path: 'register', component: RegisterSiteComponent },
    ]
  },
  { path: AppRoutePaths.notAvailable, component: NotAvailableSiteComponent },
  { path: '**', redirectTo: AppRoutePaths.notAvailable }
];
