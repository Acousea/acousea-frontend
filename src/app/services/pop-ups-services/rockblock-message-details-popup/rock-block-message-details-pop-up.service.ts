import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {RockBlockMessage} from "@/app/components/rock-block-messages-table/rock-block-messages-table.component";

@Injectable({
  providedIn: 'root'
})
export class RockBlockMessageDetailsPopUpService {

  private messageSource = new BehaviorSubject<RockBlockMessage | null>(null);
  currentMessage$ = this.messageSource.asObservable();

  openMessage(message: RockBlockMessage) {
    this.messageSource.next(message);
  }

  clearMessage() {
    this.messageSource.next(null);
  }
}
