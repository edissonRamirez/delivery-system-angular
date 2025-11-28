import { EventEmitter, Injectable } from '@angular/core';
import { io, Socket } from "socket.io-client";
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private socket!: Socket;
  callback: EventEmitter<any> = new EventEmitter<any>();
  nameEvent: string = "";

  constructor() {
    console.warn(">>> WebSocketService constructor EJECUTADO <<<");

    this.socket = io(environment.url_web_socket, {
      transports: ['websocket'],     // 🔥 SOLO websocket
      autoConnect: true,             // 🔥 no polling
      upgrade: false                 // 🔥 no intenta cambiar transport
    });

    this.socket.on("connect", () => {
      console.log("WS conectado", this.socket.id);
    });

    this.socket.on("disconnect", () => {
      console.log("WS desconectado");
    });
  }

  setNameEvent(nameEvent: string) {
    this.nameEvent = nameEvent;
    this.listen();
  }

  private listen() {
    this.socket.on(this.nameEvent, (res: any) => {
      this.callback.emit(res);
    });
  }

  emitEvent(payload: any = {}) {
    this.socket.emit(this.nameEvent, payload);
  }
}
