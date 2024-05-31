import { Component } from '@angular/core';
import {FooterComponent} from "../../components/footer/footer.component";
import {HeaderComponent} from "../../components/header/header.component";

@Component({
  selector: 'app-summary-site',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './summary-site.component.html',
  styleUrl: './summary-site.component.css'
})
export class SummarySiteComponent {

}
