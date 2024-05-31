import {Routes} from '@angular/router';
import {MainLayoutComponent} from "./sites/landing-site/main-layout.component";
import {ConfigurationSiteComponent} from "./sites/configuration-site/configuration-site.component";
import {RecordingSiteComponent} from "./sites/recording-site/recording-site.component";
import {MapSiteComponent} from "./sites/map-site/map-site.component";
import {SummarySiteComponent} from "./sites/summary-site/summary-site.component";


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: 'map', component: MapSiteComponent },
      { path: 'summary', component: SummarySiteComponent },
      { path: 'recording', component: RecordingSiteComponent },
      { path: 'configuration', component: ConfigurationSiteComponent },
    ]
  },
  { path: '**', redirectTo: '' }




];
