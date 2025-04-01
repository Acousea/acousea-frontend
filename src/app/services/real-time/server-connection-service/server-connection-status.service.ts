import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {WebSocketService} from "@/app/services/real-time/websocket-service/websocket.service";


@Injectable({
  providedIn: 'root'
})
export class ServerConnectionStatusService {
  constructor(private wsService: WebSocketService) {
  }

  get connected$(): Observable<boolean> {
    return this.wsService.isConnected$;
  }
}
