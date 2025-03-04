import {Component} from '@angular/core';
import {LoadingAnimationService} from "../../services/loading-animation-service/loading-animation.service";
import {AsyncPipe, NgIf} from "@angular/common";

@Component({
    selector: 'app-loading-animation',
    imports: [
        NgIf,
        AsyncPipe
    ],
    templateUrl: './loading-animation.component.html',
    styleUrl: './loading-animation.component.css'
})
export class LoadingAnimationComponent {
  constructor(public loadingService: LoadingAnimationService) {
  }
}
