import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  mdl_correo: string = '';
  mdl_contrasena: string = '';
  lista_respuesta: any[] = [];
  contrasena: string = '';
  correo: string = '';
  isAlertOpen = false;
  isAlertOpen2 = false;
  alertButtons = ['OK'];
  error_mensaje: any = '';
  idTipo: number = 0;
  idUsuario: number = 0;
  idPersona: number = 0;
  login2: boolean = false;

  constructor(private router: Router, private apiService: ApiService, private dbService: DbService) { }

  ngOnInit() {
  }

  volver() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['home'], parametros)
  }

  async login() {
    this.isAlertOpen2 = false;
    this.isAlertOpen = false;
    this.lista_respuesta = [];
    if (this.mdl_correo != '' && this.mdl_contrasena != '') {
      console.log(this.mdl_correo)
      console.log(this.mdl_contrasena);
      try {
        let data = this.apiService.obtenerUsuario(this.mdl_correo, this.mdl_contrasena)
        let respuesta = await lastValueFrom(data);
        let jsonTexto = JSON.stringify(respuesta);
        let json = JSON.parse(jsonTexto);
        for (let x = 0; x < json.length; x++) {
          this.lista_respuesta.push(json[x]);
          console.log(this.lista_respuesta);
          this.contrasena = this.lista_respuesta[x].Contrasena;
          this.correo = this.lista_respuesta[x].CorreoElectronico;
          this.idTipo = this.lista_respuesta[x].IdTipoUsuario;
          this.idUsuario = this.lista_respuesta[x].IdUsuario;
          this.idPersona = this.lista_respuesta[x].IdPersona;
          console.log(this.contrasena)
          console.log(this.correo)
          console.log('ID: ', this.idUsuario)
          if (this.mdl_contrasena == this.contrasena && this.mdl_correo == this.correo) {
            this.login2 = true;
            if (this.idTipo == 1) {
              this.dbService.crearSesion(this.idUsuario, '1', this.idTipo, this.correo, this.idPersona);
              let parametros: NavigationExtras = {
                state: {
                  idUsuario: this.idUsuario,
                  idTipo: this.idTipo,
                  login: this.login2,
                  correo: this.correo,
                  idPersona: this.idPersona
                },
                replaceUrl: true
              }
              this.router.navigate(['cliente'], parametros);
            } else if (this.idTipo == 2) {
              this.dbService.crearSesion(this.idUsuario, '1', this.idTipo, this.correo, this.idPersona);
              let parametros: NavigationExtras = {
                state: {
                  idUsuario: this.idUsuario,
                  idTipo: this.idTipo,
                  login: this.login2,
                  correo: this.correo,
                  idPersona: this.idPersona
                },
                replaceUrl: true
              }
              this.router.navigate(['psicologo'], parametros);
            }
          } else if (this.mdl_contrasena != this.contrasena || this.mdl_correo != this.correo) {
            this.isAlertOpen2 = true;
          }
        }
      } catch (error) {
        this.isAlertOpen2 = true;
      }
    } else {
      this.isAlertOpen = true;
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

}
