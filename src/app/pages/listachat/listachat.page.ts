import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-listachat',
  templateUrl: './listachat.page.html',
  styleUrls: ['./listachat.page.scss'],
})
export class ListachatPage implements OnInit {

  login: boolean = false;
  idTipo: number = 0;
  idUsuario: number = 0;
  idPersona: number = 0;
  idPaciente: number = 0;
  idPsicologo: number = 0;
  correo: string = '';
  showProximaCitaEmptyMessage: boolean = false;
  showHistorialCitasEmptyMessage: boolean = false;
  loading: boolean = false;
  listaPsicologos: any[] = [];
  isAlertOpen = false;
  alertButtons = ['OK'];
  error_mensaje: any = '';

  constructor(private router: Router, private apiService: ApiService, private dbService: DbService) { }

  async ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.idTipo = parametros?.extras.state['idTipo'];
      this.idPaciente = parametros?.extras.state['idPaciente'];
      this.idUsuario = parametros?.extras.state['idUsuario'];
      this.login = parametros?.extras.state['login'];
      this.correo = parametros?.extras.state['correo'];
      this.idPersona = parametros?.extras.state['idPersona'];
    }
    this.obtenerIdChat();
  }

  async obtenerIdChat() {
    console.log('HOLA')
    let data2 = this.apiService.idChat(2,this.idPaciente.toString());
    let respuesta2 = await lastValueFrom(data2);
    let jsonTexto2 = JSON.stringify(respuesta2);
    let json2 = JSON.parse(jsonTexto2);
    for (let x = 0; x < json2.length; x++) {
      this.listaPsicologos.push(json2[x]);
    }
    console.log(this.listaPsicologos)
  }

  goHome() {
    if (this.login) {
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
      this.router.navigate(['cliente'], parametros);
    } else {
      let parametros: NavigationExtras = {
        replaceUrl: true
      }
      this.router.navigate(['home'], parametros);
    }
  }

  goSoporte () {
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
    this.router.navigate(['soportepaciente'], parametros);
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

  goHistorial() {
    console.log('Login: ', this.login)
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
    this.router.navigate(['atencionespaciente'], parametros);
  }

  goEditar () {
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
    this.router.navigate(['editarpaciente'], parametros);
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

  goChatFinal(idUsuarioPsicologo: number, nombre: string) {
    let parametros: NavigationExtras = {
      state: {
        login: this.login,
        idPaciente: this.idPaciente,
        correo: this.correo,
        idUsuario: this.idUsuario,
        idTipo: this.idTipo,
        idPersona: this.idPersona,
        idUsuarioPsicologo: idUsuarioPsicologo,
        nombre: nombre
      },
      replaceUrl: true
    }
    this.router.navigate(['chat'], parametros);
  }

}
