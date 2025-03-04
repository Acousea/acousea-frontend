import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {ServiceLocator} from "./app.service.locator.service";


@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent {

  constructor(private serviceLocator: ServiceLocator) {
  }

  title = 'web-iclisten';


}
