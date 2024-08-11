import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-listachatpsicologo',
  templateUrl: './listachatpsicologo.page.html',
  styleUrls: ['./listachatpsicologo.page.scss'],
})
export class ListachatpsicologoPage implements OnInit {
  login: boolean = false;
  idPsicologo: number = 0;
  idTipo: number = 0;
  idUsuario: number = 0;
  idPersona: number = 0;
  idPaciente: number = 0;
  correo: string = '';
  showProximaCitaEmptyMessage: boolean = false;
  showHistorialCitasEmptyMessage: boolean = false;
  loading: boolean = false;
  listaPacientes: any[] = [];
  isAlertOpen = false;
  alertButtons = ['OK'];
  error_mensaje: any = '';

  constructor(private router: Router, private apiService: ApiService, private dbService: DbService) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.idPsicologo = parametros?.extras.state['idPsicologo'];
      this.idTipo = parametros?.extras.state['idTipo'];
      this.idUsuario = parametros?.extras.state['idUsuario'];
      this.login = parametros?.extras.state['login'];
      this.correo = parametros?.extras.state['correo'];
      this.idPersona = parametros?.extras.state['idPersona'];
      this.idPaciente = parametros?.extras.state['idPaciente'];
    }
    this.obtenerIdChat();
  }


  async obtenerIdChat() {
    console.log('HOLA')
    let data2 = this.apiService.idChat(1,this.idPsicologo.toString());
    let respuesta2 = await lastValueFrom(data2);
    let jsonTexto2 = JSON.stringify(respuesta2);
    let json2 = JSON.parse(jsonTexto2);
    for (let x = 0; x < json2.length; x++) {
      this.listaPacientes.push(json2[x]);
    }
    console.log(this.listaPacientes)
  }

  goHistorial() {
    this.login = true;
    let parametros: NavigationExtras = {
      state: {
        login: this.login,
        idPsicologo: this.idPsicologo,
        idUsuario: this.idUsuario,
        correo: this.correo,
        idTipo: this.idTipo,
        idPersona: this.idPersona
      },
      replaceUrl: true
    }
    this.router.navigate(['historialpsicologo'], parametros);
  }

  goAtenciones() {
    this.login = true;
    let parametros: NavigationExtras = {
      state: {
        login: this.login,
        idPsicologo: this.idPsicologo,
        idUsuario: this.idUsuario,
        correo: this.correo,
        idTipo: this.idTipo,
        idPersona: this.idPersona
      },
      replaceUrl: true
    }
    this.router.navigate(['atencionespsicologo'], parametros);
  }

  logout() {
    this.dbService.limpiarTablaUsuario();
    this.login = false;
    let parametros: NavigationExtras = {
      state: {
        login: this.login
      },
      replaceUrl: true
    }
    this.router.navigate(['home'], parametros);
  }

  goEditar() {
    console.log('Login: ', this.login)
    let parametros: NavigationExtras = {
      state: {
        login: this.login,
        idPsicologo: this.idPsicologo,
        idUsuario: this.idUsuario,
        correo: this.correo,
        idTipo: this.idTipo,
        idPersona: this.idPersona
      },
      replaceUrl: true
    };
    this.router.navigate(['editarpsicologo'], parametros);
  }

  goHome() {
    if (this.login) {
      let parametros: NavigationExtras = {
        state: {
          login: this.login,
          idPsicologo: this.idPsicologo,
          idUsuario: this.idUsuario,
          correo: this.correo,
          idTipo: this.idTipo,
          idPersona: this.idPersona
        },
        replaceUrl: true
      }
      this.router.navigate(['psicologo'], parametros);
    } else {
      let parametros: NavigationExtras = {
        replaceUrl: true
      }
      this.router.navigate(['home'], parametros);
    }
  }

  goSoporte() {
    console.log('Login: ', this.login);
    let parametros: NavigationExtras = {
      state: {
        login: this.login,
        idPsicologo: this.idPsicologo,
        idUsuario: this.idUsuario,
        correo: this.correo,
        idTipo: this.idTipo,
        idPersona: this.idPersona
      },
      replaceUrl: true
    };
    this.router.navigate(['soportepsicologo'], parametros);
  }

  goChat() {
    let parametros: NavigationExtras = {
      state: {
        login: this.login,
        idPsicologo: this.idPsicologo,
        idUsuario: this.idUsuario,
        correo: this.correo,
        idTipo: this.idTipo,
        idPersona: this.idPersona
      },
      replaceUrl: true
    }
    this.router.navigate(['listachatpsicologo'], parametros);
  }

  goChatFinal(idUsuarioPaciente: number, nombre: string) {
    let parametros: NavigationExtras = {
      state: {
        login: this.login,
        idPsicologo: this.idPsicologo,
        idUsuario: this.idUsuario,
        correo: this.correo,
        idTipo: this.idTipo,
        idPersona: this.idPersona,
        idUsuarioPaciente: idUsuarioPaciente,
        nombre: nombre
      },
      replaceUrl: true
    }
    this.router.navigate(['chatpsicologo'], parametros);
  }
}
