import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ServiceLocator} from "./app.service.locator.service";
import {TranslateModule, TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private serviceLocator: ServiceLocator) {
  }

  title = 'web-iclisten';

  ngOnInit() {
    ServiceLocator.getService<TranslateService>(TranslateService).addLangs(['us', 'fr', 'es']);
  }


}
