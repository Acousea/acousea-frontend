import {Injectable} from '@angular/core';
import {Message} from "../../components/rock-block-messages-table/rock-block-messages-table.component";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {environment} from "../../app.config";
import {BackendResponse} from "../../global-interfaces/global-interfaces";

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
    this.websocket = new WebSocket(`${environment.webSocketUrl}/${environment.apiVersion}/ws/rockblock/messages`);
    this.websocket.onmessage = (event) => {
      console.log("New message received: " + event.data);
      const newMessage: Message = JSON.parse(event.data);
      this.messagesSubject.next(newMessage);
    };
  }

  getMessages(page: number, rowsPerPage: number): Observable<BackendResponse<GetMessagesResponse>> {
    const url = `${environment.apiUrl}/${environment.apiVersion}/rockblock/messages/paginated?page=${page}&rows_per_page=${rowsPerPage}`;
    return this.http.get<BackendResponse<GetMessagesResponse>>(url);
  }

  onNewMessage(): Observable<Message> {
    return this.messagesSubject.asObservable();
  }
}
