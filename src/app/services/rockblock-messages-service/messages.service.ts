import {Injectable} from '@angular/core';
import {Message} from "../../components/history-site/rock-block-messages-table/rock-block-messages-table.component";
import {Observable, Subject} from "rxjs";
import {BackendRoutePaths} from "../../app.route.paths";
import {ApiService} from "../api-service/api.service";

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private websocket: WebSocket;
  private messagesSubject = new Subject<Message>();


  constructor(private api: ApiService) {
    this.websocket = new WebSocket(BackendRoutePaths.websocket.rockBlockMessages);
    this.websocket.onmessage = (event) => {
      console.log("New message received: " + event.data);
      const newMessage: Message = JSON.parse(event.data);
      this.messagesSubject.next(newMessage);
    };
  }

  getMessages(page: number, rowsPerPage: number) {
    const url = BackendRoutePaths.history.paginatedMessages(page, rowsPerPage);
    return this.api.get<Message[]>(url);
  }

  onNewMessage(): Observable<Message> {
    return this.messagesSubject.asObservable();
  }
}
