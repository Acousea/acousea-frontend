import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {AppRoutePaths} from "../../app.route.paths";

@Component({
  selector: 'app-not-available-site',
  standalone: true,
  imports: [
    RouterLink,
    TranslateModule
  ],
  templateUrl: './not-available-site.component.html',
  styleUrl: './not-available-site.component.css'
})
export class NotAvailableSiteComponent {

    protected readonly AppRoutePaths = AppRoutePaths;
}
