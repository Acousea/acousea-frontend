import {Component, Input} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";

@Component({
  selector: 'app-warning',
  imports: [
    TranslateModule
  ],
  templateUrl: './warning.component.html',
  styleUrl: './warning.component.css'
})
export class WarningComponent {
  @Input() message: string = 'common.no-data'; // message key for translation
  @Input() icon: string = '⚠️'; // default warning icon
}
