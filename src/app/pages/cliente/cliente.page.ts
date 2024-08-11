import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  login: boolean = false;
  vacio: boolean = false;
  idTipo: number = 0;
  idUsuario: number = 0;
  lista_respuesta: any[] = [];
  lista_datos: any[] = [];
  idPaciente: number = 0;
  proximaCita: any = {};
  error_mensaje: any = '';
  nombre_completo: string = '';
  nombre: string = '';
  correo: string = '';
  idPersona: number = 0;


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
      this.idPaciente = this.lista_respuesta[x].IdPaciente;
      console.log(this.idPaciente);
    }
    this.obtenerProximaCita();
  }


  async obtenerProximaCita() {
    const IdPaciente = this.idPaciente; // Reemplaza esto con el IdPaciente real
    try {
      const data = this.apiService.obtenerProximaCita(IdPaciente);
      const respuesta = await lastValueFrom(data);
      this.proximaCita = respuesta;
      if (this.proximaCita.length === 0) {
        this.vacio = true;
      }
    } catch (error) {
      this.error_mensaje = 'Error al obtener la próxima cita';
      console.error('Error al obtener la próxima cita', error);
      this.vacio = true;
    }
  }

  buscar() {
    this.login = true;
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
    this.router.navigate(['busqueda'], parametros);
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
}
