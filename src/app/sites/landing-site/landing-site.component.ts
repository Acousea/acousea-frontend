import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'app-landing-site',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './landing-site.component.html',
  styleUrl: './landing-site.component.css'
})
export class LandingSiteComponent {

}
