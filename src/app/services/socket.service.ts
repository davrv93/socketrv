import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';
import { WebsocketService } from "./websocket.service";
import { map } from 'rxjs/operators';

const CHAT_URL = "wss://socketsbay.com/wss/v2/2/demo/";

export interface Message {
    source: string;
    content: string;
}

@Injectable()
export class SocketService {
    public messages: Subject<Message>;

    constructor(wsService: WebsocketService) {
        this.messages = <Subject<Message>>wsService.connect(CHAT_URL).pipe(
            map(
                (response: MessageEvent): Message => {
                    console.log(response.data);
                    let data = JSON.parse(response.data)
                    return data;
                }
            )
        );
    }
}