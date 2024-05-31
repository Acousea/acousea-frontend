import { Component } from '@angular/core';
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'app-recording-site',
  standalone: true,
  imports: [
    HeaderComponent
  ],
  templateUrl: './recording-site.component.html',
  styleUrl: './recording-site.component.css'
})
export class RecordingSiteComponent {

}
