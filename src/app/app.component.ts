import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ServiceLocator} from "@/app/app.service.locator.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(
    private serviceLocator: ServiceLocator,
    private translateService: TranslateService) {
    translateService.addLangs(['us', 'fr', 'es']);
    translateService.setDefaultLang('us');
  }
}
