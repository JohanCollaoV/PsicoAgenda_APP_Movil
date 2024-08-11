import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  SenderId: number = 0;
  ReceiverId: number = 0;
  messages: any[] = [];
  newMessage: string = '';
  login: boolean = false;
  idTipo: number = 0;
  idUsuario: number = 0;
  idPersona: number = 0;
  idPaciente: number = 0;
  idUsuarioPsicologo: number = 0;
  correo: string = '';
  Nombre: string = '';

  constructor(private chatService: ChatService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.idTipo = parametros?.extras.state['idTipo'];
      this.idPaciente = parametros?.extras.state['idPaciente'];
      this.idUsuario = parametros?.extras.state['idUsuario'];
      this.idUsuarioPsicologo = parametros?.extras.state['idUsuarioPsicologo'];
      this.login = parametros?.extras.state['login'];
      this.correo = parametros?.extras.state['correo'];
      this.idPersona = parametros?.extras.state['idPersona'];
      this.Nombre = parametros?.extras.state['nombre'];
    }
    this.SenderId = this.idUsuario;
    this.ReceiverId = this.idUsuarioPsicologo;
    this.loadMessages();
    this.chatService.onNewMessage().subscribe((message: any) => {
      if ((message.SenderId === this.SenderId && message.ReceiverId === this.ReceiverId) ||
          (message.SenderId === this.ReceiverId && message.ReceiverId === this.SenderId)) {
        this.messages.push(message);
      }
    });
  }

  loadMessages() {
    this.chatService.getMessages(this.SenderId, this.ReceiverId).subscribe(messages => {
      this.messages = messages;
    });
  }

  sendMessage() {
    console.log(this.SenderId)
    console.log(this.ReceiverId)
    if (this.newMessage.trim().length > 0) {
      const message = {
        SenderId: this.SenderId,
        ReceiverId: this.ReceiverId,
        Mensaje: this.newMessage
      };
      this.chatService.sendMessage(message);
      this.newMessage = '';
    }
  }

  goChat () {
    let parametros: NavigationExtras = {
      state: {
        login: this.login,
        idPaciente: this.idPaciente,
        correo: this.correo,
        idUsuario: this.idUsuario,
        idTipo: this.idTipo,
        idPersona: this.idPersona
      },
      replaceUrl: true
    }
    this.router.navigate(['listachat'], parametros);
  }

}
