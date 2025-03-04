import {Injectable} from '@angular/core';
import {RockBlockMessage} from "../../components/rock-block-messages-table/rock-block-messages-table.component";
import {HttpClient} from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import { environment } from '@/environments/environment';
import {BackendResponse} from "../../global-interfaces/global-interfaces";

interface GetMessagesResponse {
  data: RockBlockMessage[];
  total: number;
}


@Injectable({
  providedIn: 'root'
})
export class RockBlockMessagesService {

  private websocket: WebSocket;
  private messagesSubject = new Subject<RockBlockMessage>();


  constructor(private http: HttpClient) {
    this.websocket = new WebSocket(`${environment.webSocketUrl}/${environment.apiVersion}/ws/rockblock/messages`);
    this.websocket.onmessage = (event) => {
      console.log("New message received: " + event.data);
      const newMessage: RockBlockMessage = JSON.parse(event.data);
      this.messagesSubject.next(newMessage);
    };
  }

  getMessages(page: number, rowsPerPage: number): Observable<BackendResponse<GetMessagesResponse>> {
    const url = `${environment.apiUrl}/${environment.apiVersion}/rockblock/messages/paginated?page=${page}&rows_per_page=${rowsPerPage}`;
    return this.http.get<BackendResponse<GetMessagesResponse>>(url);
  }

  onNewMessage(): Observable<RockBlockMessage> {
    return this.messagesSubject.asObservable();
  }
}
