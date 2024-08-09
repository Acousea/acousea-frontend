import {Injectable} from '@angular/core';
import {Message} from "../../components/history-site/rock-block-messages-table/rock-block-messages-table.component";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {BackendResponse} from "../../global-interfaces/global-interfaces";
import {BackendRoutePaths} from "../../app.route.paths";

interface GetMessagesResponse {
  data: Message[];
  total: number;
}


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private websocket: WebSocket;
  private messagesSubject = new Subject<Message>();


  constructor(private http: HttpClient) {
    this.websocket = new WebSocket(BackendRoutePaths.websocket.notifications);
    this.websocket.onmessage = (event) => {
      console.log("New message received: " + event.data);
      const newMessage: Message = JSON.parse(event.data);
      this.messagesSubject.next(newMessage);
    };
  }

  getMessages(page: number, rowsPerPage: number): Observable<BackendResponse<GetMessagesResponse>> {
    const url = BackendRoutePaths.history.paginatedMessages(page, rowsPerPage);
    return this.http.get<BackendResponse<GetMessagesResponse>>(url);
  }

  onNewMessage(): Observable<Message> {
    return this.messagesSubject.asObservable();
  }
}
