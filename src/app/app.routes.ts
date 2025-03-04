import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./sites/main-layout/main-layout.component";
import {MapSiteComponent} from "./sites/map-site/map-site.component";
import {SummarySiteComponent} from "./sites/summary-site/summary-site.component";
import {HistorySiteComponent} from "./sites/history-site/history-site.component";
import {UserProfileSiteComponent} from "./sites/users/user-profile-site/user-profile-site.component";
import {NotAvailableSiteComponent} from "./sites/not-available-site/not-available-site.component";
import {RegisterSiteComponent} from "./sites/users/register-site/register-site.component";
import {AuthGuard} from "./guard/AuthGuard/authGuard";
import {AppRoutePaths} from "./app.route.paths";
import {
  RegisterStepAccountComponent
} from "./components/register-site/register-step-account/register-step-account.component";
import {
  RegisterStepProfileComponent
} from "./components/register-site/register-step-profile/register-step-profile.component";
import {LoginSiteComponent} from "./sites/users/login-site/login-site.component";
import {AuthSiteComponent} from "./sites/users/auth-site/auth-site.component";
import {
  SummaryStatsComponentComponent
} from "./components/summary-site/summary-stats-component/summary-stats-component.component";
import {NodeInfoComponent} from "./components/summary-site/node-info-component/node-info.component";
import {
  NodeSettingsComponent
} from "./components/summary-site/node-configuration-component/node-settings.component";


export const routes: Routes = [
  {path: '', redirectTo: AppRoutePaths.summary.base, pathMatch: 'full'},
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: AppRoutePaths.summary.base,
        component: SummarySiteComponent,
        children: [
          {path: 'stats', component: SummaryStatsComponentComponent},
          {path: 'info', component: NodeInfoComponent},
          {path: 'settings', component: NodeSettingsComponent},
          {path: '', redirectTo: 'stats', pathMatch: 'full'}
        ]
      },
      {path: AppRoutePaths.map, component: MapSiteComponent},
      {path: AppRoutePaths.history.base, redirectTo: AppRoutePaths.history.iridiumMessages, pathMatch: 'full'},
      {
        path: AppRoutePaths.history.base, children: [
          {path: 'iridium-messages', component: HistorySiteComponent},
          {path: 'control-system', component: HistorySiteComponent},
          {path: 'pam-system', component: HistorySiteComponent},
        ]
      },
      {path: AppRoutePaths.systemInfo, component: NodeInfoComponent},

    ],
  },
  {path: AppRoutePaths.user.base, redirectTo: AppRoutePaths.user.profile, pathMatch: 'full'},
  {
    path: AppRoutePaths.user.base,
    canActivate: [AuthGuard],
    children: [
      {path: 'profile', component: UserProfileSiteComponent},
    ]
  },
  {
    path: AppRoutePaths.auth.base,
    canActivate: [AuthGuard],
    component: AuthSiteComponent, children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'login', component: LoginSiteComponent},
      {
        path: 'register', component: RegisterSiteComponent, children: [
          {path: '', redirectTo: 'step1', pathMatch: 'full'},
          {path: 'step1', component: RegisterStepAccountComponent},
          {path: 'step2', component: RegisterStepProfileComponent}
        ]
      },
    ]
  },
  {path: AppRoutePaths.notAvailable, component: NotAvailableSiteComponent},
  {path: '**', redirectTo: AppRoutePaths.notAvailable}
];
