import { Component } from '@angular/core';
import { WebsocketService } from "./services/websocket.service";
import { ChatService } from "./services/chat.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [WebsocketService, ChatService]
})

export class AppComponent {
  title = 'socketrv';
  content = '';
  received = [];
  sent = [];

  constructor(private chatService: ChatService) {
    chatService.messages.subscribe(msg => {
      this.received.push(msg);
      console.log("Response from websocket: " + msg);
    });
  }


  sendMsg() {
    let message = {
      source: '',
      content: ''
    };
    message.source = 'localhost';
    message.content = this.content;

    this.sent.push(message);
    this.chatService.messages.next(message);
  }
}