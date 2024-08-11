import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { lastValueFrom } from 'rxjs';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-psicologo',
  templateUrl: './psicologo.page.html',
  styleUrls: ['./psicologo.page.scss'],
})
export class PsicologoPage implements OnInit {
  atencionesCitas: any[] = [];
  showAtencionesCitasEmptyMessage: boolean = false;
  loading: boolean = false;
  isAlertOpen = false;
  alertButtons = ['OK'];
  error_mensaje: any = '';
  login: boolean = false;
  idPsicologo: number = 0;
  idTipo: number = 0;
  idUsuario: number = 0;
  idPersona: number = 0;
  correo: string = '';
  lista_respuesta: any = [];
  nombre: string = '';
  lista_datos: any = [];
  idPaciente: number = 0;
  isLoading: boolean = true;

  constructor(private router: Router, private apiService: ApiService, private dbService: DbService) { }

  async ngOnInit() {
    this.loadCitas();
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.idPsicologo = parametros?.extras.state['idPsicologo'];
      this.idTipo = parametros?.extras.state['idTipo'];
      this.idUsuario = parametros?.extras.state['idUsuario'];
      this.login = parametros?.extras.state['login'];
      this.correo = parametros?.extras.state['correo'];
      this.idPersona = parametros?.extras.state['idPersona'];
      this.idPaciente = parametros?.extras.state['idPaciente'];
      console.log('Id Usuario:' + this.idUsuario)
    }
    if (!this.login) {
      this.router.navigate(['home']);
    } else {
      let data2 = this.apiService.datosPersona(this.idPersona);
      let respuesta2 = await lastValueFrom(data2);
      let jsonTexto2 = JSON.stringify(respuesta2);
      let json2 = JSON.parse(jsonTexto2);
      for (let x = 0; x < json2.length; x++) {
        this.lista_datos.push(json2[x]);
        this.nombre = this.lista_datos[x].PrimerNombre;
      }
      let data = this.apiService.getId(this.idTipo, this.idUsuario);
      let respuesta = await lastValueFrom(data);
      let jsonTexto = JSON.stringify(respuesta);
      let json = JSON.parse(jsonTexto);
      for (let x = 0; x < json.length; x++) {
        this.lista_respuesta.push(json[x]);
        this.idPsicologo = this.lista_respuesta[x].IdPsicologo;
        console.log(this.idPsicologo);
      }
      this.obtenerAtencionesPsicologo();
    }
  }

  loadCitas() {
    setTimeout(() => {
      this.isLoading = false;
    }, 2500); // Simula un tiempo de carga de 2 segundos
  }

  async obtenerAtencionesPsicologo() {
    const IdPsicologo = this.idPsicologo; // Reemplaza esto con el IdPsicologo real
    try {
      const data = this.apiService.obtenerAtencionesPsicologo(IdPsicologo);
      const respuesta = await lastValueFrom(data) as any[];
      this.atencionesCitas = respuesta;
      this.showAtencionesCitasEmptyMessage = !this.atencionesCitas || this.atencionesCitas.length === 0;
    } catch (error) {
      this.showAtencionesCitasEmptyMessage = true;
      this.isAlertOpen = true;
      this.error_mensaje = 'Error al obtener las atenciones';
      console.error('Error al obtener las atenciones', error);
    }
  }

  verFicha(index: number) {
    console.log(index)
    const idPaciente = this.atencionesCitas[index].IdPaciente;
    let parametros: NavigationExtras = {
      state: {
        idPaciente: idPaciente,
        login: this.login,
        idPsicologo: this.idPsicologo,
        idUsuario: this.idUsuario,
        correo: this.correo,
        idTipo: this.idTipo,
        idPersona: this.idPersona
      },
      replaceUrl: true
    };
    console.log("idPaciente: " + idPaciente);
    this.router.navigate(['fichapsicologo'], parametros);
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
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
}


