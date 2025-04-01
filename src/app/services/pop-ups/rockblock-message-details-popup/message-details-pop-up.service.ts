import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Message} from "@/app/components/history-site/rock-block-messages-table/rock-block-messages-table.component";

@Injectable({
  providedIn: 'root'
})
export class MessageDetailsPopUpService {

  private messageSource = new BehaviorSubject<Message | null>(null);
  currentMessage$ = this.messageSource.asObservable();

  openMessage(message: Message) {
    this.messageSource.next(message);
  }

  clearMessage() {
    this.messageSource.next(null);
  }
}
