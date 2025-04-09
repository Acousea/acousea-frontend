import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';

import {BackendRoutePaths} from "@/app/routes/backend.route.paths";

export interface WebSocketMessage {
  type: string;
  payload: any;
}

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<WebSocketMessage> | null = null;
  private readonly connectionDetails = {
    url: BackendRoutePaths.websocket.notifications,
    isConnectedSubject: new BehaviorSubject<boolean>(true),
    RECONNECT_DELAY: 5000, // Default reconnect delay
    reconnectTimeout: null as any,
    PING_INTERVAL: 45000, // Default ping interval
    pingIntervalId: null as any
  };
  private messageSubjects: Map<string, Subject<any>> = new Map(
    [
      ['ping', new Subject<void>()],
      ['notification', new Subject<any>()]
    ]
  );

  constructor() {
    this.connect();
  }

  private connect() {
    if (this.socket$) {
      this.socket$.complete();
    }

    this.socket$ = webSocket<WebSocketMessage>(this.connectionDetails.url);

    this.socket$.subscribe({
      next: (message: WebSocketMessage) => this.handleMessage(message),
      error: (error) => {
        console.error(`WebSocket error: ${error}`);
        this.connectionDetails.isConnectedSubject.next(false);
        this.scheduleReconnect();
      },
      complete: () => {
        console.warn("WebSocket closed. Attempting to reconnect...");
        this.connectionDetails.isConnectedSubject.next(false);
        this.scheduleReconnect();
      }
    });

    this.startPing();
  }

  private startPing() {
    this.clearPing(); // por si acaso ya estaba uno activo
    console.warn("Starting ping interval ->>", this.connectionDetails.PING_INTERVAL);
    this.connectionDetails.pingIntervalId = setInterval(() => {
      if (this.socket$) {
        this.socket$.next({type: 'ping', payload: {}});
      }
    }, this.connectionDetails.PING_INTERVAL);
  }

  private clearPing() {
    if (this.connectionDetails.pingIntervalId) {
      clearInterval(this.connectionDetails.pingIntervalId);
      this.connectionDetails.pingIntervalId = null;
    }
  }


  private handleMessage(message: WebSocketMessage) {
    console.log("Handle message ->>", message);
    const subject = this.messageSubjects.get(message.type);
    if (!subject) {
      console.warn(`Unhandled WebSocket message type: ${message.type} with payload: ${message.payload}`);
      return;
    }
    subject.next(message.payload);
    this.connectionDetails.isConnectedSubject.next(true);
  }

  private scheduleReconnect() {
    clearTimeout(this.connectionDetails.reconnectTimeout);
    this.connectionDetails.reconnectTimeout = setTimeout(() => this.connect(), this.connectionDetails.RECONNECT_DELAY);
  }

  public subscribeToMessageType<T>(messageType: string): Observable<T> {
    if (!this.messageSubjects.has(messageType)) {
      this.messageSubjects.set(messageType, new Subject<T>());
    }
    return this.messageSubjects.get(messageType)!.asObservable();
  }

  public sendMessage(message: WebSocketMessage) {
    if (this.socket$) {
      this.socket$.next(message);
    } else {
      console.warn("Cannot send message: WebSocket is not connected.");
    }
  }

  public get isConnected$(): Observable<boolean> {
    return this.connectionDetails.isConnectedSubject.asObservable();
  }
}
