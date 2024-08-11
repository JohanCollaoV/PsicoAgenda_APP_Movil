import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-editarpsicologo',
  templateUrl: './editarpsicologo.page.html',
  styleUrls: ['./editarpsicologo.page.scss'],
})
export class EditarpsicologoPage implements OnInit {

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
  mdl_comuna: string = '';
  idComuna: number = 0;
  mdl_valorSesion: number = 0;
  mdl_descripcion: string = '';
  mdl_especialidad: string = '';
  idEspecialidad: number = 0;
  lista_comunas: any[] = [];
  lista_especialidades: any[] = [];
  isAlertOpen = false;
  isAlertOpen2 = false;
  alertButtons = ['OK'];
  error_mensaje: string = '';
  idTipo: number = 0;
  idPsicologo: number = 0;
  login: boolean = false;
  correo: string = '';
  idPaciente: number = 0;

  constructor(private router: Router, private apiService: ApiService, private dbService: DbService) { }

  async ngOnInit() {
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
      this.cargarDatosUsuario(this.idUsuario);
      this.cargarComunas();
      this.cargarEspecialidades();
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
        this.mdl_comuna = usuario.NombreComuna || '';
        this.mdl_valorSesion = usuario.ValorSesion || 0;
        this.mdl_descripcion = usuario.Descripcion || '';
        this.mdl_especialidad = usuario.NombreEspecialidad || '';
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
      const respuesta = await lastValueFrom(data) as any[];
      this.lista_comunas = respuesta;
    } catch (error) {
      console.error('Error al cargar las comunas', error);
    }
  }

  async cargarEspecialidades() {
    try {
      const data = this.apiService.especilidades();
      const respuesta = await lastValueFrom(data) as any[];
      this.lista_especialidades = respuesta;
    } catch (error) {
      console.error('Error al cargar las especialidades', error);
    }
  }

  async guardarDatos() {
    await this.parametros();
    if (this.idDireccion != 0 && this.idComuna != 0 && this.idEspecialidad != 0) {
      console.log('Datos para updatePsicologo:', {
        idUsuario: this.idUsuario,
        idPersona: this.idPersona,
        idDireccion: this.idDireccion,
        mdl_calle: this.mdl_calle,
        mdl_numeracion: this.mdl_numero,
        idComuna: this.idComuna,
        mdl_valor: this.mdl_valorSesion,
        mdl_telefono: this.mdl_telefono,
        mdl_descripcion: this.mdl_descripcion,
        idEspecialidad: this.idEspecialidad,
        mdl_nombre: this.mdl_primerNombre,
        mdl_nombre2: this.mdl_segundoNombre,
        mdl_apellido: this.mdl_apellidoPaterno,
        mdl_apellido2: this.mdl_apellidoMaterno
      });
      this.apiService.updatePsicologo(
        this.idUsuario,
        this.idPersona,
        this.idDireccion,
        this.mdl_calle,
        this.mdl_numero,
        this.idComuna,
        this.mdl_valorSesion,
        this.mdl_telefono,
        this.mdl_descripcion,
        this.idEspecialidad,
        this.mdl_primerNombre,
        this.mdl_segundoNombre,
        this.mdl_apellidoPaterno,
        this.mdl_apellidoMaterno
      ).subscribe(
        response => {
          console.log('Datos actualizados', response);
          this.isAlertOpen = true;
          this.error_mensaje = 'Datos actualizados correctamente';
        },
        error => {
          console.error('Error al actualizar datos', error);
          this.isAlertOpen2 = true;
          this.error_mensaje = 'Error al actualizar los datos';
        }
      );
    }
  }

  async parametros() {
    if (this.mdl_comuna) {
      try {
        const dataComuna = this.apiService.buscarComuna(this.mdl_comuna);
        const respuestaComuna = await lastValueFrom(dataComuna) as any[];
        if (respuestaComuna.length > 0) {
          this.idComuna = respuestaComuna[0].IdComuna;
        } else {
          this.isAlertOpen = true;
          this.error_mensaje = 'Comuna no encontrada.';
        }
      } catch (error) {
        this.isAlertOpen = true;
        this.error_mensaje = 'Error al buscar la comuna';
        console.error('Error al buscar la comuna', error);
      }
    }

    if (this.mdl_especialidad) {
      const especialidadEncontrada = this.lista_especialidades.find(e => e.NombreEspecialidad === this.mdl_especialidad);
      if (especialidadEncontrada) {
        this.idEspecialidad = especialidadEncontrada.IdEspecialidad;
      } else {
        this.isAlertOpen = true;
        this.error_mensaje = 'Especialidad no encontrada.';
      }
    }
  }

  cancelar() {
    this.router.navigate(['/psicologo']);
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
