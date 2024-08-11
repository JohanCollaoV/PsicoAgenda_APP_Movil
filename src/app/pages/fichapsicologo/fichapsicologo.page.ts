import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';
import { DbService } from 'src/app/services/db.service';


@Component({
  selector: 'app-fichapsicologo',
  templateUrl: './fichapsicologo.page.html',
  styleUrls: ['./fichapsicologo.page.scss'],
})
export class FichapsicologoPage implements OnInit {

  login: boolean = false;
  idTipo: number = 0;
  idUsuario: number = 0;
  fichasPaciente: any[] = [];
  isAlertOpen = false;
  alertButtons = ['OK'];
  error_mensaje: any = '';
  idPaciente: number = 0;
  idPsicologo: number = 0;
  idPersona: number = 0;
  correo: string = '';


  constructor(private router: Router, private apiService: ApiService, private dbService: DbService) {}

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
      console.log('Id Usuario:' + this.idUsuario);

      console.log('Id Paciente:' + this.idPaciente);
      console.log('Id Paciente:' + this.idPsicologo);
    }
    if (!this.login) {
      this.router.navigate(['home']);
    } else {
      this.obtenerFichasPaciente();
    }
  }

  async obtenerFichasPaciente() {
    try {
      const data = this.apiService.obtenerDetallesCitas(this.idPaciente);
      const respuesta = await lastValueFrom(data) as any[];
      this.fichasPaciente = respuesta;
    } catch (error) {
      this.isAlertOpen = true;
      this.error_mensaje = 'Error al obtener las fichas del paciente';
      console.error('Error al obtener las fichas del paciente', error);
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }

  
  goHome() {
    if (this.login) {
      let parametros: NavigationExtras = {
        state: {
          idPaciente: this.idPaciente,
          login: this.login,
          idPsicologo: this.idPsicologo,
          idUsuario: this.idUsuario,
          correo: this.correo,
          idTipo: this.idTipo,
          idPersona: this.idPersona
        },
        replaceUrl: true
      };
      this.router.navigate(['psicologo'], parametros);
    } else {
      let parametros: NavigationExtras = {
        replaceUrl: true
      };
      this.router.navigate(['home'], parametros);
    }
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
    };
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
    };
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
    this.router.navigate(['editarpsicologo'], parametros);
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
}