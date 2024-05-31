import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";
import {FooterComponent} from "../../components/footer/footer.component";

@Component({
  selector: 'app-recording-site',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './recording-site.component.html',
  styleUrl: './recording-site.component.css'
})
export class RecordingSiteComponent {

}
