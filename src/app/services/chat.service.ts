import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { LocalNotifications } from '@capacitor/local-notifications';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private apiUrl = 'https://psicoagenda-api.azurewebsites.net'; // Asegúrate de que esta URL sea correcta

  constructor(private http: HttpClient) {
    this.socket = io(this.apiUrl, {
      path: '/socket.io', // Asegúrate de tener esta línea
      transports: ['websocket', 'polling'],
    });

    this.socket.on('message', async (msg: any) => {
      // Verifica si la notificación se puede mostrar
      await LocalNotifications.schedule({
        notifications: [
          {
            title: 'Nuevo mensaje',
            body: `Nuevo mensaje de ${msg.senderName}`,
            id: msg.IdMensaje,
            schedule: { at: new Date(Date.now() + 1000) },
            sound: undefined,
            attachments: undefined,
            actionTypeId: '',
            extra: null
          }
        ]
      });
    });
  }

  getMessages(SenderId: number, ReceiverId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/v1/messages`, {
      params: {
        SenderId: SenderId.toString(),
        ReceiverId: ReceiverId.toString()
      }
    });
  }

  sendMessage(msg: any) {
    this.socket.emit('message', msg);
  }

  onNewMessage(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message', (msg) => {
        observer.next(msg);
      });
    });
  }
}