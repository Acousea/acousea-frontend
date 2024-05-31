import {Routes} from '@angular/router';
import {LandingSiteComponent} from "./sites/landing-site/landing-site.component";
import {ConfigurationSiteComponent} from "./sites/configuration-site/configuration-site.component";
import {RecordingSiteComponent} from "./sites/recording-site/recording-site.component";
import {MapSiteComponent} from "./sites/map-site/map-site.component";


export const routes: Routes = [
  {path: 'landing', component: LandingSiteComponent},
  // Redirect to 'map' route
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  // Add route 'map' to the routes array
  { path: 'map', component: MapSiteComponent },
  { path: 'recording', component: RecordingSiteComponent},
  { path: 'configuration', component: ConfigurationSiteComponent},




];
