import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./sites/main-layout/main-layout.component";
import {MapSiteComponent} from "./sites/map-site/map-site.component";
import {SummarySiteComponent} from "./sites/summary-site/summary-site.component";
import {DeviceInfoSiteComponent} from "./sites/device-info-site/device-info-site.component";
import {ItemsBarComponent} from "./components/side-menu/menu-element/steps-bar/items-bar.component";
import {LineChartComponent} from "./components/charts/line-chart/line-chart.component";
import {StreamRecordingComponent} from "./sites/recording-site/stream-recording/stream-recording.component";
import {ExportRecordingComponent} from "./sites/recording-site/export-recording/export-recording.component";
import {SetupRecordingComponent} from "./sites/recording-site/setup-recording/setup-recording.component";
import {NetworkConfigComponent} from "./sites/configuration-site/network-config/network-config.component";
import {
  DataCollectionConfigComponent
} from "./sites/configuration-site/data-collection-config/data-collection-config.component";
import {EpochConfigComponent} from "./sites/configuration-site/epoch-config/epoch-config.component";
import {TestComponent} from "./sites/test/test.component";
import {DeviceConfigPopupComponent} from "./components/pop-ups/device-config-popup/device-config-popup.component";
import {
  RockBlockMessagesTableComponent
} from "./components/rock-block-messages-table/rock-block-messages-table.component";


export const routes: Routes = [
  // Default redirect to /summary
  {path: '', redirectTo: 'summary', pathMatch: 'full'},
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: 'summary', component: SummarySiteComponent},
      {path: 'map', component: MapSiteComponent},
      {path: 'recording', redirectTo: 'recording/stream', pathMatch: 'full'},
      {
        path: 'recording', children: [
          {path: 'stream', component: StreamRecordingComponent},
          {path: 'setup', component: SetupRecordingComponent},
          {path: 'export', component: ExportRecordingComponent}
        ]
      },
      {path: 'configuration', redirectTo: 'configuration/data-collection', pathMatch: 'full'},
      {
        path: 'configuration', children: [
          {path: 'data-collection', component: DataCollectionConfigComponent},
          {path: 'epoch', component: EpochConfigComponent},
          {path: 'network', component: NetworkConfigComponent}
        ]
      },
      {path: 'device-info', component: DeviceInfoSiteComponent},
    ]
  },
  {path: 'steps-bar', component: ItemsBarComponent},
  {path: 'chart', component: LineChartComponent},

  {path: 'test', component: RockBlockMessagesTableComponent},

  // Create fake routes from step1 to step 4 that go to /steps-bar
  {path: '**', redirectTo: ''}


];
