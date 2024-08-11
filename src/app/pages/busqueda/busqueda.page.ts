import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
})
export class BusquedaPage implements OnInit {

  constructor(private router: Router, private apiService: ApiService, private dbService: DbService) { }

  showOptions: boolean = false;
  lista_respuesta: any[] = [];
  criterio: number = 0;
  mdl_dato: string = '';
  mdl_dato2: string = '';
  currentPage = 1;
  itemsPerPage = 5;
  totalPages: number = 0;
  login: boolean = false;
  idUsuario: string = '';
  idPsicologo: string = '';
  loading: boolean = false;
  idPaciente: number = 0;
  correo: string = '';
  lista_especialidades: any = [];
  especialidad: string = 'Especialidad';
  idTipo: number = 0;
  idPersona: number = 0;

  ngOnInit() {
    this.especialidades();
    this.busqueda();
    setTimeout(() => {
      this.loading = true;
    }, 1500);
    let parametros = this.router.getCurrentNavigation();
    if (parametros?.extras.state) {
      this.idTipo = parametros?.extras.state['idTipo'];
      this.idPaciente = parametros?.extras.state['idPaciente'];
      this.idUsuario = parametros?.extras.state['idUsuario'];
      this.login = parametros?.extras.state['login'];
      this.correo = parametros?.extras.state['correo'];
      this.idPersona = parametros?.extras.state['idPersona'];
    }
  }

  agendarCita(index: number) {
    if (this.login) {
      const elemento2 = document.getElementById('id_psicologo_' + index);
      const idPsicologoString = elemento2 ? elemento2.textContent : null;
      const idPsicologo = parseInt(idPsicologoString!, 10);
      this.idPsicologo = idPsicologo.toString();
      console.log('El ID del usuario como texto es:', this.idPsicologo);
      let parametros: NavigationExtras = {
        state: {
          login: this.login,
          idPaciente: this.idPaciente,
          correo: this.correo,
          idUsuario: this.idUsuario,
          idTipo: this.idTipo,
          idPsicologo: this.idPsicologo,
          idPersona: this.idPersona
        },
        replaceUrl: true
      }
      this.router.navigate(['calendario'], parametros);
    } else if (!this.login) {
      let parametros: NavigationExtras = {
        replaceUrl: true
      }
      this.router.navigate(['login'], parametros);
    }
  }

  async busqueda() {
    let data = this.apiService.listaPsicologos();
    let respuesta = await lastValueFrom(data);
    let jsonTexto = JSON.stringify(respuesta);
    let json = JSON.parse(jsonTexto);
    for (let x = 0; x < json.length; x++) {
      this.lista_respuesta.push(json[x]);
      this.totalPages = Math.ceil(this.lista_respuesta.length / this.itemsPerPage);
    }
    console.log(this.lista_respuesta)
  }

  async busquedaParametros() {
    
  }

  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
  }

  get paginatedItems() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.lista_respuesta.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPage(page: number) {
    this.currentPage = page;
  }

  async especialidades() {
    let data = this.apiService.especilidades();
    let respuesta = await lastValueFrom (data);
    let jsonTexto = JSON.stringify(respuesta);
    let json = JSON.parse(jsonTexto);
    for (let x = 0; x < json.length; x++) {
      this.lista_especialidades.push(json[x]);
    }
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

  async buscarPsicologo() {
    console.log(this.mdl_dato)
    console.log(this.mdl_dato2)
    if (this.mdl_dato2 == 'Especialidad') {
      this.mdl_dato2 = '';
    }
    if (this.mdl_dato != '' && this.mdl_dato2 != '' && this.mdl_dato2 != 'Especialidad' ) {
      this.lista_respuesta = [];
      this.totalPages = 0;
      this.criterio = 3;
      let data = this.apiService.buscarPsicologos(this.criterio, this.mdl_dato, this.mdl_dato2);
      let respuesta = await lastValueFrom(data);
      let jsonTexto = JSON.stringify(respuesta);
      let json = JSON.parse(jsonTexto);
      for (let x = 0; x < json.length; x++) {
        this.lista_respuesta.push(json[x]);
        this.totalPages = Math.ceil(this.lista_respuesta.length / this.itemsPerPage);
    }
    } else if (this.mdl_dato2 != '') {
      this.lista_respuesta = [];
      this.totalPages = 0;
      this.criterio = 2;
      let data = this.apiService.buscarPsicologos(this.criterio, this.mdl_dato2, this.mdl_dato2);
      let respuesta = await lastValueFrom(data);
      let jsonTexto = JSON.stringify(respuesta);
      let json = JSON.parse(jsonTexto);
      for (let x = 0; x < json.length; x++) {
        this.lista_respuesta.push(json[x]);
        this.totalPages = Math.ceil(this.lista_respuesta.length / this.itemsPerPage);
      }
    } else if (this.mdl_dato != '') {
      this.lista_respuesta = [];
      this.totalPages = 0;
      this.criterio = 1;
      let data = this.apiService.buscarPsicologos(this.criterio, this.mdl_dato, this.mdl_dato2);
      let respuesta = await lastValueFrom(data);
      let jsonTexto = JSON.stringify(respuesta);
      let json = JSON.parse(jsonTexto);
      for (let x = 0; x < json.length; x++) {
        this.lista_respuesta.push(json[x]);
        this.totalPages = Math.ceil(this.lista_respuesta.length / this.itemsPerPage);
      }
    } else  {
      this.lista_respuesta = [];
      this.totalPages = 0;
      this.criterio = 0;
      this.busqueda();
    }
  }

  async buscador() {
    let data = this.apiService.buscarPsicologos(this.criterio, this.mdl_dato, this.mdl_dato2);
    let respuesta = await lastValueFrom(data);
    let jsonTexto = JSON.stringify(respuesta);
    let json = JSON.parse(jsonTexto);
    for (let x = 0; x < json.length; x++) {
      this.lista_respuesta.push(json[x]);
      this.totalPages = Math.ceil(this.lista_respuesta.length / this.itemsPerPage);
    }
  }

}