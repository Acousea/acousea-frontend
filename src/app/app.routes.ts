import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./sites/main-layout/main-layout.component";
import {MapSiteComponent} from "./sites/map-site/map-site.component";
import {SummarySiteComponent} from "./sites/summary-site/summary-site.component";
import {SystemInfoSiteComponent} from "./sites/device-info-site/system-info-site.component";
import {ItemsBarComponent} from "./components/side-menu/menu-element/steps-bar/items-bar.component";
import {LineChartComponent} from "./components/charts/line-chart/line-chart.component";
import {
  RockBlockMessagesTableComponent
} from "./components/rock-block-messages-table/rock-block-messages-table.component";
import {NotificationListComponent} from "./components/notifications/notification-list/notification-list.component";
import {HistorySiteComponent} from "./sites/history-site/history-site.component";
import {PamSystemConfigComponent} from "./sites/configuration-site/pam-system-config/pam-system-config.component";
import {
  ControlSystemConfigComponent
} from "./sites/configuration-site/control-system-config/control-system-config.component";
import {
  RecordingAndProcessingConfigComponent
} from "./sites/configuration-site/recording-and-processing-config/recording-and-processing-config.component";


export const routes: Routes = [
  // Default redirect to /summary
  {path: '', redirectTo: 'summary', pathMatch: 'full'},
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: 'summary', component: SummarySiteComponent},
      {path: 'map', component: MapSiteComponent},
      {path: 'history', redirectTo: 'history/iridium-messages', pathMatch: 'full'},
      {
        path: 'history', children: [
          {path: 'iridium-messages', component: HistorySiteComponent},
          {path: 'control-system', component: HistorySiteComponent},
          {path: 'pam-system', component: HistorySiteComponent},

        ]
      },
      {path: 'configuration', redirectTo: 'configuration/recording-processing', pathMatch: 'full'},
      {
        path: 'configuration', children: [
          {path: 'recording-processing', component: RecordingAndProcessingConfigComponent},
          {path: 'control-system', component: ControlSystemConfigComponent},
          {path: 'pam-system', component: PamSystemConfigComponent},
        ]
      },
      {path: 'system-info', component: SystemInfoSiteComponent},
    ]
  },
  {path: 'steps-bar', component: ItemsBarComponent},
  {path: 'chart', component: LineChartComponent},

  {path: 'test', component: RockBlockMessagesTableComponent},
  {path: 'test2', component: NotificationListComponent},

  // Create fake routes from step1 to step 4 that go to /steps-bar
  {path: '**', redirectTo: ''}


];
