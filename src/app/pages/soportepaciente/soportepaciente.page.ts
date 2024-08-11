import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-soportepaciente',
  templateUrl: './soportepaciente.page.html',
  styleUrls: ['./soportepaciente.page.scss'],
})
export class SoportepacientePage implements OnInit {

  login: boolean = false;
  idTipo: number = 0;
  idPaciente: number = 0;
  correo: string = '';
  idUsuario: number = 0;
  idPersona: number = 0;
  mdl_opcion: string = '';
  formReagendar: boolean = false;
  botonReagendar: boolean = false;
  formCancelar: boolean = false;
  botonCancelar: boolean = false;
  formConsulta: boolean = false;
  botonConsulta: boolean = false;
  lista_respuesta: any = [];
  lista_citas: any = [];
  lista_datos: any = [];
  lista_psicologos: any = [];
  boton: boolean = false;
  mdl_detalle: any = [];
  mdl_hora: any = [];
  correoCorp: string = 'psicoagendaapp@hotmail.com';
  isAlertOpen = false;
  isAlertOpen2 = false;
  isAlertOpen3 = false;
  isAlertOpen4 = false;
  isAlertOpen5 = false;
  alertButtons = ['OK'];
  mdl_asunto: string = '';
  mdl_mensaje: string = '';
  nombre: string = '';
  rut: string = '';
  selectedDate: string = '';
  fechaFinal: string = '';
  availableTimes: any[] = [];
  fechaAnterior: boolean = false;
  fechaCita: string = '';
  validadorHora: number = 1;
  idPsicologo: number = 0;
  horas: boolean = false;
  botonFinal: boolean = false;
  listaReagendar: boolean = false;

  constructor(private router: Router, private apiService: ApiService, private dbService: DbService) { }

  ngOnInit() {
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.idTipo = parametros?.extras.state['idTipo'];
      this.idPaciente = parametros?.extras.state['idPaciente'];
      this.idUsuario = parametros?.extras.state['idUsuario'];
      this.login = parametros?.extras.state['login'];
      this.correo = parametros?.extras.state['correo'];
      this.idPersona = parametros?.extras.state['idPersona'];
      console.log("ID USUARIO" + this.idUsuario)
      console.log("ID TIPO" + this.idTipo)
      console.log("ID PACIENTE" + this.idPaciente)
    }
    if (!this.login) {
      this.router.navigate(['home']);
    } else {
      this.citasAsignadas();
      this.datosPersona();
      const currentDate = new Date();
      const offset = currentDate.getTimezoneOffset() * 60000; // Obtén el desplazamiento en milisegundos
      this.selectedDate = new Date(currentDate.getTime() - offset).toISOString().slice(0, -1);
      console.log(this.lista_respuesta)
      console.log(this.lista_citas)
    }
  }

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
  }

  setOpen4(isOpen: boolean) {
    this.isAlertOpen4 = isOpen;
  }

  setOpen5(isOpen: boolean) {
    this.isAlertOpen5 = isOpen;
  }

  formatDate(dateString: string) {
    const date = new Date(dateString);
    const fechaFormat = `${('0' + date.getDate()).slice(-2)}-${('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
    this.fechaFinal = fechaFormat;
    this.fechaCita = this.fechaFinal;
  }

  getCurrentDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son de 0 a 11
    const year = today.getFullYear();

    return `${day}-${month}-${year}`;
  }

  async citasAsignadas() {
    const todayDate: string = this.getCurrentDate();
    console.log('Hoy: ' + todayDate)
    let data = this.apiService.citasAsignadas(this.idPaciente);
    let respuesta = await lastValueFrom(data);
    let jsonTexto = JSON.stringify(respuesta);
    let json = JSON.parse(jsonTexto);
    for (let x = 0; x < json.length; x++) {
      this.lista_respuesta.push(json[x]);
      if (this.lista_respuesta[x].fecha >= todayDate) {
        this.lista_citas.push(this.lista_respuesta[x]);
      }
    }
  }

  scheduleAppointment(time: string) {
    console.log('Cita agendada para', this.selectedDate, 'a las', time);
    // Agrega aquí lógica adicional para confirmar la cita o interactuar con una API
  }

  async datosPersona() {
    let data = this.apiService.datosPersona(this.idPersona);
    let respuesta = await lastValueFrom(data);
    let jsonTexto = JSON.stringify(respuesta);
    let json = JSON.parse(jsonTexto);
    for (let x = 0; x < json.length; x++) {
      this.lista_datos.push(json[x]);
      this.nombre = this.lista_datos[x].PrimerNombre + ' ' + this.lista_datos[x].ApellidoPaterno
      this.rut = this.lista_datos[x].Rut
    }
  }

  goHistorial() {
    console.log('Login: ', this.login)
    let parametros: NavigationExtras = {
      state: {
        login: this.login,
        idPaciente: this.idPaciente,
        correo: this.correo,
        idUsuario: this.idUsuario,
        idTipo: this.idTipo
      },
      replaceUrl: true
    }
    this.router.navigate(['atencionespaciente'], parametros);
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

  goEditar() {
    let parametros: NavigationExtras = {
      state: {
        login: this.login,
        idPaciente: this.idPaciente,
        correo: this.correo,
        idUsuario: this.idUsuario,
        idTipo: this.idTipo
      },
      replaceUrl: true
    }
    this.router.navigate(['editarpaciente'], parametros);
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

  cambiarOpcion() {
    console.log("Opcion: " + this.mdl_opcion);
    if (this.mdl_opcion == 'Selecciona una opción') {
      this.mdl_detalle = '';
      this.formReagendar = false;
      this.formCancelar = false;
      this.formConsulta = false;
      this.botonReagendar = false;
      this.botonCancelar = false;
      this.botonConsulta = false;
      this.listaReagendar = false;
      this.horas = false;
      this.fechaAnterior = false;
      this.botonFinal = false;
    } else if (this.mdl_opcion == 'Reagendar Hora') {
      this.mdl_detalle = '';
      this.formReagendar = true;
      this.formCancelar = false;
      this.formConsulta = false;
      this.botonReagendar = false;
      this.botonCancelar = false;
      this.botonConsulta = false;
      this.listaReagendar = false;
      this.horas = false;
      this.fechaAnterior = false;
      this.botonFinal = false;
      if (this.lista_citas.length === 0) {
        this.setOpen4(true);
        this.cancelar();
      }
    } else if (this.mdl_opcion == 'Cancelar Hora') {
      this.mdl_detalle = '';
      this.formReagendar = false;
      this.formCancelar = true;
      this.formConsulta = false;
      this.botonReagendar = false;
      this.botonCancelar = false;
      this.botonConsulta = false;
      this.listaReagendar = false;
      this.listaReagendar = false;
      this.horas = false;
      this.fechaAnterior = false;
      this.botonFinal = false;
      if (this.lista_citas.length === 0) {
        this.setOpen4(true);
        this.cancelar();
      }
    } else if (this.mdl_opcion == 'Realizar Consulta') {
      this.mdl_detalle = '';
      this.formReagendar = false;
      this.formCancelar = false;
      this.formConsulta = true;
      this.botonReagendar = false;
      this.botonCancelar = false;
      this.botonConsulta = false;
      this.listaReagendar = false;
      this.horas = false;
      this.fechaAnterior = false;
      this.botonFinal = false;
    }

  }

  botonTrue() {
    this.boton = true;
    console.log(this.mdl_detalle.IdCita);
  }

  botones() {
    if (this.mdl_opcion == 'Reagendar Hora' && this.boton) {
      this.botonReagendar = true;
      this.listaReagendar = true;
      this.botonCancelar = false;
      this.botonConsulta = false;
    } else if (this.mdl_opcion == 'Cancelar Hora' && this.boton == true) {
      this.botonReagendar = false;
      this.listaReagendar = false;
      this.botonCancelar = true;
      this.botonConsulta = false;
    } else if (this.mdl_opcion == 'Realizar Consulta' && this.boton) {
      this.botonReagendar = false;
      this.listaReagendar = false;
      this.botonCancelar = false;
      this.botonConsulta = true;
    }
  }

  cancelarCita() {
    this.isAlertOpen = false;
    this.isAlertOpen2 = false;
    this.isAlertOpen3 = false;
    const subject = 'SOPORTE: Cancelación de Cita Numero ' + this.mdl_detalle.IdCita;

    const text = 'Estimados,\n\nSe informa que el usuario ' + this.mdl_detalle.nombre_paciente + ' a solicitado cancelar la siguiente cita:' +
      '\n\nNumero de Cita: ' + this.mdl_detalle.IdCita +
      '\n\nPsicologo: ' + this.mdl_detalle.nombre_psicologo +
      '\n\nPaciente: ' + this.mdl_detalle.nombre_paciente +
      '\n\nFecha: ' + this.mdl_detalle.fecha +
      '\n\nHora: ' + this.mdl_detalle.hora +
      '\n\nSaludos Cordiales,\nArea de TI.';

    const html = `
              <p>Estimados,</p>
              <p>Se informa que el usuario ${this.mdl_detalle.nombre_paciente} a solicitado cancelar la siguiente cita:</p>
              <p><strong>Numero Cita: ${this.mdl_detalle.IdCita}</strong></p>
              <p><strong>Psicologo: ${this.mdl_detalle.nombre_psicologo}</strong></p>
              <p><strong>Paciente: ${this.mdl_detalle.nombre_paciente}</strong></p>
              <p><strong>Fecha: ${this.mdl_detalle.fecha}</strong></p>
              <p><strong>Hora: ${this.mdl_detalle.hora}</strong></p>
              <p>Saludos Cordiales,</p>
              <p>Area de TI.</p>
          `;

    this.apiService.sendEmail(this.correoCorp, subject, text, html).subscribe(
      response => {
        console.log('Email Enviado Correctamente', response);
        this.isAlertOpen = true;

      },
      error => {
        console.error('Error al enviar correo', error);
        this.isAlertOpen2 = true;

      }
    );
    setTimeout(() => {
      this.cancelar();
    }, 2500);
  }

  enviarConsulta() {
    this.isAlertOpen = false;
    this.isAlertOpen2 = false;
    this.isAlertOpen3 = false;
    this.isAlertOpen5 = false;
    if (this.mdl_asunto != '' && this.mdl_mensaje != '') {
      const subject = 'CONSULTA: ' + this.mdl_asunto;
      const text = 'Estimados,\n\nEl usuario ' + this.nombre + ' ha enviado la siguiente consulta:' +
        '\n\n' + this.mdl_mensaje +
        '\n\nDatos del usuario:' +
        '\nCorreo: ' + this.correo +
        '\nRut: ' + this.rut +
        '\n\nSaludos Cordiales,\nArea de TI.';

      const html = `
              <p>Estimados,</p>
              <p>El usuario ${this.nombre} ha enviado la siguiente consulta:</p>
              <p><strong>${this.mdl_mensaje}</strong></p>
              <p>Datos del usuario:</p>
              <ul> 
                <li>Correo: ${this.correo}</li> 
                <li>Rut: ${this.rut}</li>  
              </ul>
              <p>Saludos Cordiales,</p>
              <p>Area de TI.</p>
          `;

      this.apiService.sendEmail(this.correoCorp, subject, text, html).subscribe(
        response => {
          console.log('Email Enviado Correctamente', response);
          this.isAlertOpen = true;

        },
        error => {
          console.error('Error al enviar correo', error);
          this.isAlertOpen2 = true;

        }
      );
      setTimeout(() => {
        this.cancelar();
      }, 2500);
    } else {
      this.isAlertOpen5 = true;
    }

  }

  cancelar() {
    this.formReagendar = false;
    this.formCancelar = false;
    this.formConsulta = false;
    this.botonReagendar = false;
    this.botonCancelar = false;
    this.botonConsulta = false;
    this.listaReagendar = false;
    this.mdl_detalle = '';
    this.mdl_asunto = '';
    this.mdl_mensaje = '';
    this.mdl_opcion = '';
    this.botonFinal = false;
    this.lista_respuesta = [];
    this.lista_citas = [];
    this.citasAsignadas();
  }

  async loadAvailableTimes() {
    this.horas = false;
    this.fechaAnterior = false;
    this.botonFinal = false;
    this.availableTimes = [];
    console.log('Fecha seleccionada:', this.selectedDate);
    this.formatDate(this.selectedDate);
    console.log('Id Psicologo:', this.idPsicologo);
    console.log('Fecha formateada:', this.fechaFinal);

    const todayDate: string = this.getCurrentDate();
    console.log('Hoy: ' + todayDate);

    // Convertir las cadenas de fecha a objetos Date
    const todayDateObj = this.parseDate(todayDate);
    const fechaFinalObj = this.parseDate(this.fechaFinal);

    let data = this.apiService.buscarPsicologos(1, this.mdl_detalle.nombre_psicologo, '');
    let respuesta = await lastValueFrom(data);
    let jsonTexto = JSON.stringify(respuesta);
    let json = JSON.parse(jsonTexto);
    for (let x = 0; x < json.length; x++) {
      this.lista_psicologos.push(json[x]);
      this.idPsicologo = this.lista_psicologos[x].IdPsicologo;
    }

    if (fechaFinalObj < todayDateObj) {
      this.fechaAnterior = true;
      this.botonFinal = false;
      this.listaReagendar = false;
    } else {
      if (this.selectedDate) {
        console.log(this.mdl_detalle.IdPsicologo)
        let data = this.apiService.obtenerHoras(this.idPsicologo, this.fechaFinal);
        let respuesta = await lastValueFrom(data);
        console.log('Respuesta completa de la API:', respuesta);

        // Asegurarse de que la respuesta es un array
        if (Array.isArray(respuesta)) {
          if (respuesta.length === 0) {
            this.horas = true;
            this.listaReagendar = false;
            this.botonFinal = false;
            console.log('No hay horas disponibles.');
          } else {
            this.listaReagendar = true;
            respuesta.forEach(hora => {
              this.availableTimes.push(hora);
              console.log('Hora disponible:', hora);
            });
            // Verificar si hay al menos un elemento para tomar el IdCita
            if (this.availableTimes.length > 0) {
              this.validadorHora = this.availableTimes[0].IdCita;
            }
          }
        } else {
          console.log('Respuesta no es un arreglo. Revisar el formato de los datos recibidos de la API.');
        }
      }
    }
  }

  // Método para convertir una cadena de fecha en formato 'DD-MM-YYYY' a un objeto Date
  parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('-').map(part => parseInt(part, 10));
    return new Date(year, month - 1, day);
  }


  ultimoBoton() {
    this.botonFinal = true;
  }

  reagendarCitaFinal() {
    this.apiService.confirmarCita(this.idPaciente, 3, this.mdl_detalle.IdCita).subscribe(
      response => {
        console.log('Cita Actualizada Correctamente', response);
      },
      error => {
        console.error('Error al agendar la cita', error);
      }
    );
    this.apiService.confirmarCita(this.idPaciente, 1, this.mdl_hora.IdCita).subscribe(
      response => {
        console.log('Cita Agendada Correctamente', response);
        this.isAlertOpen3 = true;
      },
      error => {
        console.error('Error al agendar la cita', error);
        this.isAlertOpen2 = true;
      }
    );
    setTimeout(() => {
      this.cancelar();
    }, 2500);
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


}
