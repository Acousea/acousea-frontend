import { Routes } from '@angular/router';
import {MapSiteComponent} from "../map-site/map-site.component";

export const routes: Routes = [
  // Redirect to 'map' route
  { path: '', redirectTo: 'map', pathMatch: 'full' },
  // Add route 'map' to the routes array
  { path: 'map', component: MapSiteComponent },

];
