import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-editarpaciente',
  templateUrl: './editarpaciente.page.html',
  styleUrls: ['./editarpaciente.page.scss'],
})
export class EditarpacientePage implements OnInit {

  idUsuario: number = 0;
  idPersona: number = 0;
  idDireccion: number = 0;
  mdl_primerNombre: string = '';
  mdl_segundoNombre: string = '';
  mdl_apellidoPaterno: string = '';
  mdl_apellidoMaterno: string = '';
  mdl_telefono: string = '';
  mdl_calle: string = '';
  mdl_numero: number = 0;
  idComuna: number = 0;
  lista_comunas: any[] = [];
  isAlertOpen = false;
  isAlertOpen2 = false;
  alertButtons = ['OK'];
  error_mensaje: string = '';
  login: boolean = false;
  idTipo: number = 0;
  idPaciente: number = 0;
  correo: string = '';
  comuna: string = '';

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
    if (!this.login) {
      this.router.navigate(['home']);
    } else { 
      await this.cargarDatosUsuario(this.idUsuario);
      await this.cargarComunas();
    }

  }

  async cargarDatosUsuario(idUsuario: number) {
    try {
      const data = this.apiService.buscarUsuario(1, idUsuario.toString());
      const respuesta = await lastValueFrom(data) as any[];
      if (respuesta.length > 0) {
        const usuario = respuesta[0];
        this.idPersona = usuario.IdPersona;
        this.idDireccion = usuario.IdDireccion;
        this.mdl_primerNombre = usuario.PrimerNombre || '';
        this.mdl_segundoNombre = usuario.SegundoNombre || '';
        this.mdl_apellidoPaterno = usuario.ApellidoPaterno || '';
        this.mdl_apellidoMaterno = usuario.ApellidoMaterno || '';
        this.mdl_telefono = usuario.Telefono || '';
        this.mdl_calle = usuario.Calle || '';
        this.mdl_numero = usuario.Numero || 0;
        this.idComuna = usuario.IdComuna || 0;
        this.comuna = usuario.NombreComuna || '';
      } else {
        this.isAlertOpen = true;
        this.error_mensaje = 'No se encontraron datos para este usuario.';
      }
    } catch (error) {
      this.isAlertOpen = true;
      this.error_mensaje = 'Error al cargar los datos del usuario';
      console.error('Error al cargar los datos del usuario', error);
    }
  }

  async cargarComunas() {
    try {
      const data = this.apiService.obtenerComunas();
      this.lista_comunas = await lastValueFrom(data) as any[];
      console.log('Lista de comunas cargadas:', this.lista_comunas); // Verificar que la lista de comunas se cargue correctamente
    } catch (error) {
      console.error('Error al cargar las comunas', error);
    }
  }

  guardarDatos() {
    if (this.idDireccion != 0) {
      this.apiService.updatePaciente(
        this.idPersona,
        this.idDireccion,
        this.mdl_calle,
        this.mdl_numero,
        this.idComuna,
        this.mdl_telefono,
        this.mdl_primerNombre,
        this.mdl_segundoNombre,
        this.mdl_apellidoPaterno,
        this.mdl_apellidoMaterno
      ).subscribe(
        response => {
          console.log('Datos actualizados', response);
          this.isAlertOpen = true;
        },
        error => {
          console.error('Error al actualizar datos', error);
          this.isAlertOpen2 = true;
          this.error_mensaje = 'Error al actualizar los datos';
        }
      );
    }
  }

  cancelar() {
    this.goHome();
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  setOpen2(isOpen: boolean) {
    this.isAlertOpen2 = isOpen;
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

}
