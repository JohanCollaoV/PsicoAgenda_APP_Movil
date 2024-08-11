import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  ruta = 'https://psicoagenda-api.azurewebsites.net/usuarios/login/';
  ruta_ps = 'https://psicoagenda-api.azurewebsites.net/psicologos/get_psicologos/';
  ruta_busqueda_ps = 'https://psicoagenda-api.azurewebsites.net/psicologos/datos_psicologo/';
  ruta_prestadores = 'https://prestadores.azurewebsites.net/profesionales/get_profesionales/';
  ruta_horas = 'https://psicoagenda-api.azurewebsites.net/psicologos/horas_psicologo/';
  ruta_detalles_citas = 'https://psicoagenda-api.azurewebsites.net/usuarios/get_citas_by_id';
  ruta_proxima_cita = 'https://psicoagenda-api.azurewebsites.net/usuarios/get_proxima_cita_by_id';
  ruta_citas_psicologo = 'https://psicoagenda-api.azurewebsites.net/psicologos/get_citas_psicologo';
  ruta_atenciones_psicologo = 'https://psicoagenda-api.azurewebsites.net/psicologos/get_atenciones_psicologo';
  ruta_historial_psicologo = 'https://psicoagenda-api.azurewebsites.net/psicologos/get_historial_psicologo';
  rutaId = 'https://psicoagenda-api.azurewebsites.net/usuarios/obtener_id/';
  rutaCita = 'https://psicoagenda-api.azurewebsites.net/paciente/agendarCita/'
  rutaRegistroPsicologo = 'https://psicoagenda-api.azurewebsites.net/usuarios/registro_psicologo/'
  rutaRecuperacion = 'https://psicoagenda-api.azurewebsites.net/usuarios/cambiar_contrasena/'
  rutaToken = 'https://psicoagenda-api.azurewebsites.net/usuarios/guadarToken/';
  rutaInsertarPaciente = 'https://psicoagenda-api.azurewebsites.net/usuarios/insertar_paciente/';
  rutaMantenedorCita = 'https://psicoagenda-api.azurewebsites.net/admin/buscarCita/'
  rutaBuscarUsuario = 'https://psicoagenda-api.azurewebsites.net/admin/buscarUsuario/'
  rutaBuscarComuna = 'https://psicoagenda-api.azurewebsites.net/usuarios/comuna/'
  rutaBuscarEspecialidad = 'https://psicoagenda-api.azurewebsites.net/psicologos/especialidad/'
  rutaEspecialidades = 'https://psicoagenda-api.azurewebsites.net/psicologos/allEspecialidades/'
  rutaBuscarPsicologos = 'https://psicoagenda-api.azurewebsites.net/psicologos/buscar_psicologos/'
  rutaComunas = 'https://psicoagenda-api.azurewebsites.net/usuarios/todasLasComunas/'
  rutaAsignadas = 'https://psicoagenda-api.azurewebsites.net/usuarios/citas_asignadas/'
  rutaPersona = 'https://psicoagenda-api.azurewebsites.net/usuarios/datosPaciente/'
  rutaFinalizarCita = 'https://psicoagenda-api.azurewebsites.net/paciente/finalizarCita/'
  rutaChat = 'https://psicoagenda-api.azurewebsites.net/usuarios/datosChat/'
  
  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, text: string, html: string): Observable<any> {
    const url = 'https://psicoagenda-api.azurewebsites.net/api/v1/email/send'
    const body = {
      to: to,
      subject: subject,
      text: text,
      html: html
    }
    return this.http.post(url, body);
  }

  adminCita(criterio: number, dato: string) {
    return this.http.get(this.rutaMantenedorCita + '?Criterio=' + criterio + '&Dato=' + dato).pipe();
  }

  idChat(criterio: number, dato: string) {
    return this.http.get(this.rutaChat + '?Criterio=' + criterio + '&Dato=' + dato).pipe();
  }

  buscarPsicologos(criterio: number, dato: string, dato2: string) {
    return this.http.get(this.rutaBuscarPsicologos + '?Criterio=' + criterio + '&Dato=' + dato + '&Dato2=' + dato2).pipe();
  }

  buscarUsuario(criterio: number, dato: string) {
    return this.http.get(this.rutaBuscarUsuario + '?Criterio=' + criterio + '&Dato=' + dato).pipe();
  }

  buscarComuna(nombreComuna: string) {
    return this.http.get(this.rutaBuscarComuna + '?NombreComuna=' + nombreComuna).pipe();
  }

  buscarEspecilidad(nombreEspecialidad: string) {
    return this.http.get(this.rutaBuscarEspecialidad + '?NombreEspecialidad=' + nombreEspecialidad).pipe();
  }

  citasAsignadas(IdPaciente: number) {
    return this.http.get(this.rutaAsignadas + '?IdPaciente=' + IdPaciente).pipe();  //Historial citas
  }

  especilidades() {
    return this.http.get(this.rutaEspecialidades)
  }
  
  obtenerComunas(): Observable<any> {
    return this.http.get(this.rutaComunas);
  }

  updatePaciente(
    IdPersona: number,
    IdDireccion: number,
    Calle: string,
    Numero: number,
    IdComuna: number,
    Telefono: string,
    PrimerNombre: string,
    SegundoNombre: string,
    ApellidoPaterno: string,
    ApellidoMaterno: string
  ) {
    const url = `https://psicoagenda-api.azurewebsites.net/usuarios/patch_paciente/`;
    const body = {
      IdPersona: IdPersona,
      IdDireccion: IdDireccion,
      Calle: Calle,
      Numero: Numero,
      IdComuna: IdComuna,
      Telefono: Telefono,
      PrimerNombre: PrimerNombre,
      SegundoNombre: SegundoNombre,
      ApellidoPaterno: ApellidoPaterno,
      ApellidoMaterno: ApellidoMaterno
    };
    return this.http.post(url, body);
  }

  updatePsicologo(
    IdUsuario: number,
    IdPersona: number,
    IdDireccion: number,
    Calle: string,
    Numero: number,
    IdComuna: number,
    ValorSesion: number,
    Telefono: string,
    Descripcion: string,
    IdEspecialidad: number,
    PrimerNombre: string,
    SegundoNombre: string,
    ApellidoPaterno: string,
    ApellidoMaterno: string
  ) {
    const url = `https://psicoagenda-api.azurewebsites.net/psicologos/patch_psicologo/`;
    const body = {
      IdUsuario: IdUsuario,
      IdPersona: IdPersona,
      IdDireccion: IdDireccion,
      Calle: Calle,
      Numero: Numero,
      IdComuna: IdComuna,
      ValorSesion: ValorSesion,
      Telefono: Telefono,
      Descripcion: Descripcion,
      IdEspecialidad: IdEspecialidad,
      PrimerNombre: PrimerNombre,
      SegundoNombre: SegundoNombre,
      ApellidoPaterno: ApellidoPaterno,
      ApellidoMaterno: ApellidoMaterno
    };
    return this.http.post(url, body);
  }

  recuperacionClave(correo: string, contrasena: string) {
    return this.http.get(this.rutaRecuperacion + '?CorreoElectronico=' + correo + '&NuevaContrasena=' + contrasena).pipe();
  }

  obtenerUsuario(correo: string, contrasena: string) {
    return this.http.get(this.ruta + '?CorreoElectronico=' + correo + '&Contrasena=' + contrasena).pipe();
  }

  obtenerHoras(id: number, fecha: string) {
    return this.http.get(this.ruta_horas + '?IdPsicologo=' + id + '&FechaCita=' + fecha).pipe();
  }

  listaPsicologos() {
    return this.http.get(this.ruta_ps).pipe();
  }

  datosPsicologo(id: number) {
    return this.http.get(this.ruta_busqueda_ps + '?IdPsicologo=' + id).pipe();
  }

  validarPrestadores(rut: string) {
    return this.http.get(this.ruta_prestadores + '?Rut=' + rut).pipe();
  }

  obtenerDetallesCitas(IdPaciente: number) {
    return this.http.get(this.ruta_detalles_citas + '?IdPaciente=' + IdPaciente).pipe();  //Historial citas
  }

  datosPersona(IdPersona: number) {
    return this.http.get(this.rutaPersona + '?IdPersona=' + IdPersona).pipe();  //Historial citas
  }

  obtenerProximaCita(IdPaciente: number) {
    return this.http.get(this.ruta_proxima_cita + '?IdPaciente=' + IdPaciente).pipe();    //Próxima Cita
  }

  obtenerCitaPsicologo(IdPsicologo: string) {
    return this.http.get(this.ruta_citas_psicologo + '?IdPsicologo=' + IdPsicologo).pipe();    //Historial Psicologo
  }

  obtenerHistorialPsicologo(IdPsicologo: number) {
    return this.http.get(this.ruta_historial_psicologo + '?IdPsicologo=' + IdPsicologo).pipe();    //Historial Psicologo
  }

  obtenerAtencionesPsicologo(IdPsicologo: number) {
    return this.http.get(this.ruta_atenciones_psicologo + '?IdPsicologo=' + IdPsicologo).pipe();    //Atenciones Psicologo
  }

  createTransaction(buyOrder: string, sessionId: string, amount: number, returnUrl: string): Observable<any> {
    const url = `https://psicoagenda-api.azurewebsites.net/api/v1/transbank/transaction/create`;
    const body = {
      buy_order: buyOrder,
      session_id: sessionId,
      amount: amount,
      return_url: returnUrl
    };
    return this.http.post(url, body);
  }

  commitTransaction(token: string): Observable<any> {
    const url = `https://psicoagenda-api.azurewebsites.net/api/v1/transbank/transaction/commit/${token}`;
    return this.http.put(url, { token });
  }

  getId(IdTipoUsuario: number, IdUsuario: number) {
    return this.http.get(this.rutaId + '?IdTipoUsuario=' + IdTipoUsuario + '&IdUsuario=' + IdUsuario).pipe();    //Atenciones Psicologo
  }

  confirmarCita(IdPaciente: number, IdEstadoCita: number, IdCita: number) {
    return this.http.get(this.rutaCita + '?IdPaciente=' + IdPaciente + '&IdEstadoCita=' + IdEstadoCita + '&IdCita=' + IdCita).pipe();
  }

  finalizarCita(Tratamiento: string, Diagnostico: string, IdCita: number) {
    return this.http.get(this.rutaFinalizarCita + '?Tratamiento=' + Tratamiento + '&Diagnostico=' + Diagnostico + '&IdCita=' + IdCita).pipe();
  }

  registrarPsicologo(
    Calle: string,
    Numero: number,
    IdComuna: number,
    PrimerNombre: string,
    SegundoNombre: string,
    ApellidoPaterno: string,
    ApellidoMaterno: string,
    Telefono: string,
    FechaNacimiento: string,
    CorreoElectronico: string,
    Contrasena: string,
    IdTipoUsuario: number,
    Rut: string,
    ValorSesion: string,
    IdEspecialidad: number,
  ) {
    const body = {
      Calle: Calle,
      Numero: Numero,
      IdComuna: IdComuna,
      PrimerNombre: PrimerNombre,
      SegundoNombre: SegundoNombre,
      ApellidoPaterno: ApellidoPaterno,
      ApellidoMaterno: ApellidoMaterno,
      Telefono: Telefono,
      FechaNacimiento: FechaNacimiento,
      CorreoElectronico: CorreoElectronico,
      Contrasena: Contrasena,
      IdTipoUsuario: IdTipoUsuario,
      Rut: Rut,
      ValorSesion: ValorSesion,
      IdEspecialidad: IdEspecialidad
    };
    return this.http.post(this.rutaRegistroPsicologo, body);
  }

  guardarToken(token: string, correo: string) {
    return this.http.get(this.rutaToken + '?Token=' + token + '&CorreoElectronico=' + correo).pipe();
  }

  registrarPaciente(
    Calle: string,
    Numero: number,
    IdComuna: number,
    PrimerNombre: string,
    SegundoNombre: string,
    ApellidoPaterno: string,
    ApellidoMaterno: string,
    Telefono: string,
    FechaNacimiento: string,
    CorreoElectronico: string,
    Contrasena: string,
    IdTipoUsuario: number,
    Rut: string
  ) {
    const body = {
      Calle: Calle,
      Numero: Numero,
      IdComuna: IdComuna,
      PrimerNombre: PrimerNombre,
      SegundoNombre: SegundoNombre,
      ApellidoPaterno: ApellidoPaterno,
      ApellidoMaterno: ApellidoMaterno,
      Telefono: Telefono,
      FechaNacimiento: FechaNacimiento,
      CorreoElectronico: CorreoElectronico,
      Contrasena: Contrasena,
      IdTipoUsuario: IdTipoUsuario,
      Rut: Rut
    };
    return this.http.post(this.rutaInsertarPaciente, body);
  }



}
