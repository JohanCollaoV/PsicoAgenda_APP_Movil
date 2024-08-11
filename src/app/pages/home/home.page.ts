import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goLogin() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['login'], parametros);
  }

  registro() {
    let parametros: NavigationExtras = {
      replaceUrl: true
    }
    this.router.navigate(['tiporegistro'], parametros)
  }

}
