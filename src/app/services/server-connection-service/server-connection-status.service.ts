import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {WebSocketSubject} from 'rxjs/webSocket';
import {WebSocketService} from "@/app/services/websocket-service/websocket.service";


@Injectable({
  providedIn: 'root'
})
export class ServerConnectionStatusService {
  private socket$: WebSocketSubject<Object> | null = null;
  private connectedSubject = new BehaviorSubject<boolean>(false);
  private readonly RECONNECT_DELAY = 5000; // Try reconnecting every 5 seconds

  constructor(private wsService: WebSocketService) {
  }

  get connected$(): Observable<boolean> {
    return this.wsService.isConnected$;
  }
}
