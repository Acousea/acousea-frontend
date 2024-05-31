import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'app-configuration-site',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './configuration-site.component.html',
  styleUrl: './configuration-site.component.css'
})
export class ConfigurationSiteComponent {

}
