import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./sites/main-layout/main-layout.component";
import {ConfigurationSiteComponent} from "./sites/configuration-site/configuration-site.component";
import {RecordingSiteComponent} from "./sites/recording-site/recording-site.component";
import {MapSiteComponent} from "./sites/map-site/map-site.component";
import {SummarySiteComponent} from "./sites/summary-site/summary-site.component";
import {DeviceInfoSiteComponent} from "./sites/device-info-site/device-info-site.component";
import {ItemsBarComponent} from "./components/side-menu/menu-element/steps-bar/items-bar.component";
import {LineChartComponent} from "./components/charts/line-chart/line-chart.component";


export const routes: Routes = [
  // Default redirect to /summary
  { path: '', redirectTo: 'summary', pathMatch: 'full' },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'summary', component: SummarySiteComponent },
      { path: 'map', component: MapSiteComponent },
      { path: 'recording', component: RecordingSiteComponent },
      { path: 'configuration', component: ConfigurationSiteComponent },
      { path: 'device-info', component: DeviceInfoSiteComponent},
    ]
  },
  { path: 'steps-bar', component: ItemsBarComponent},
  { path: 'chart', component: LineChartComponent},



  // Create fake routes from step1 to step 4 that go to /steps-bar
  { path: 'steps-bar/1', component: ItemsBarComponent},
  { path: 'steps-bar/2', component: ItemsBarComponent},
  { path: 'steps-bar/3', component: ItemsBarComponent},
  { path: 'steps-bar/4', component: ItemsBarComponent},
  { path: 'step1', redirectTo: 'steps-bar/1' },
  { path: 'step2', redirectTo: 'steps-bar/2' },
  { path: 'step3', redirectTo: 'steps-bar/3' },
  { path: 'step4', redirectTo: 'steps-bar/4' },
  { path: '**', redirectTo: '' }




];
