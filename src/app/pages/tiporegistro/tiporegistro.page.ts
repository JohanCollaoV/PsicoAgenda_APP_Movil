import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-tiporegistro',
  templateUrl: './tiporegistro.page.html',
  styleUrls: ['./tiporegistro.page.scss'],
})
export class TiporegistroPage implements OnInit {

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit() {
  }

  volver() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['home'], parametros)
  }

  paciente() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['registropaciente'], parametros)
  }

  psicologo() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['registropsicologo'], parametros)
  }

}
