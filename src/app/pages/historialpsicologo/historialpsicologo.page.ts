import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-historialpsicologo',
  templateUrl: './historialpsicologo.page.html',
  styleUrls: ['./historialpsicologo.page.scss'],
})
export class HistorialpsicologoPage implements OnInit {
  historialCitas: any[] = [];
  showHistorialCitasEmptyMessage: boolean = false;
  isAlertOpen = false;
  alertButtons = ['OK'];
  error_mensaje: any = '';
  login: boolean = false;
  idPsicologo: number = 0;
  idPaciente: string = '';
  idPersona: number = 0;
  correo: string = '';
  idTipo: number = 0;
  idUsuario: number = 0;

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
      this.obtenerHistorialPsicologo();
    }
  }

  async obtenerHistorialPsicologo() {
    const IdPsicologo = this.idPsicologo; // Reemplaza esto con el IdPsicologo real
    try {
      const data = this.apiService.obtenerHistorialPsicologo(IdPsicologo);
      const respuesta = await lastValueFrom(data) as any[];
      this.historialCitas = respuesta;
      this.showHistorialCitasEmptyMessage = !this.historialCitas || this.historialCitas.length === 0;
    } catch (error) {
      this.showHistorialCitasEmptyMessage = true;
      this.isAlertOpen = true;
      this.error_mensaje = 'Error al obtener el historial de citas';
      console.error('Error al obtener el historial de citas', error);
    } 
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }

  verFicha(index: number) {
    const elemento2 = document.getElementById('id_paciente_' + index);
    const idPacienteString = elemento2 ? elemento2.textContent : null;
    const idPaciente = parseInt(idPacienteString!, 10);
    this.idPaciente = idPaciente.toString();
    let parametros: NavigationExtras = {
      state: {
        idPaciente: this.idPaciente,
        login: this.login,
        idPsicologo: this.idPsicologo,
        idUsuario: this.idUsuario,
        correo: this.correo,
        idTipo: this.idTipo,
        idPersona: this.idPersona,
      },
      replaceUrl: true,
    };
    console.log('idPaciente: ' + this.idPaciente);
    this.router.navigate(['fichapsicologo'], parametros);
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
        idPersona: this.idPersona,
      },
      replaceUrl: true,
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
        idPersona: this.idPersona,
      },
      replaceUrl: true,
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
        idPersona: this.idPersona,
      },
      replaceUrl: true,
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
          idPersona: this.idPersona,
        },
        replaceUrl: true,
      };
      this.router.navigate(['psicologo'], parametros);
    } else {
      let parametros: NavigationExtras = {
        replaceUrl: true,
      };
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
}
