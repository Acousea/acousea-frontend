import {Routes} from '@angular/router';
import {MainLayoutComponent} from "@/app/main-layout/main-layout.component";
import {MapSiteComponent} from "./sites/map-site/map-site.component";
import {DashboardSiteComponent} from "./sites/dashboard-site/dashboard-site.component";
import {HistorySiteComponent} from "./sites/history-site/history-site.component";
import {UserProfileSiteComponent} from "@/app/sites/user-profile-site/user-profile-site.component";
import {NotAvailableSiteComponent} from "./sites/not-available-site/not-available-site.component";
import {RegisterSiteComponent} from "@/app/sites/auth-site/register-site/register-site.component";
import {AuthGuard} from "./guard/AuthGuard/authGuard";
import {AppRoutePaths} from "./app.route.paths";
import {
  RegisterStepAccountComponent
} from "./components/auth-site/register-step-account/register-step-account.component";
import {
  RegisterStepProfileComponent
} from "./components/auth-site/register-step-profile/register-step-profile.component";
import {LoginSiteComponent} from "@/app/sites/auth-site/login-site/login-site.component";
import {AuthSiteComponent} from "@/app/sites/auth-site/auth-site/auth-site.component";

import {TestSiteComponent} from "@/app/sites/test-site/test-site.component";
import {
  SummaryStatsSectionComponent
} from "@/app/components/dashboard-site/summary-stats-section-component/summary-stats-section.component";
import {
  NodeInformationSectionComponent
} from "@/app/components/dashboard-site/node-information-section-component/node-information-section.component";
import {
  NodeSettingsSectionComponent
} from "@/app/components/dashboard-site/node-settings-section-component/node-settings-section.component";


export const routes: Routes = [
  {path: '', redirectTo: AppRoutePaths.summary.base, pathMatch: 'full'},
  {
    path: '',
    canActivate: [AuthGuard],
    component: MainLayoutComponent,
    children: [
      {
        path: AppRoutePaths.summary.base,
        component: DashboardSiteComponent,
        children: [
          {path: 'stats', component: SummaryStatsSectionComponent},
          {path: 'info', component: NodeInformationSectionComponent},
          {path: 'settings', component: NodeSettingsSectionComponent},
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
      {path: AppRoutePaths.systemInfo, component: NodeInformationSectionComponent},

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
  {path: 'test', component: TestSiteComponent},
  {path: AppRoutePaths.notAvailable, component: NotAvailableSiteComponent},
  {path: '**', redirectTo: AppRoutePaths.notAvailable}
];
