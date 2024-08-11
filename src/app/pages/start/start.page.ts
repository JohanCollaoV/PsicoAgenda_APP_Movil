import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbService } from 'src/app/services/db.service';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage implements OnInit {
  
  lista_persistencia: Usuario[] = [];
  login: boolean = false;
  IdUsuario: number = 0;
  validador: boolean = false;
  IdPersona: number = 0;
  Correo: string = '';
  IdTipo: number = 0;

  constructor(private dbService: DbService, private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.dbService.obtenerTodasLasSesiones().then(data => {
        console.log(data); // Verifica la estructura de los datos recibidos
  
        for (let x = 0; x < data.length; x++) {
          this.lista_persistencia.push(data[x]);
        }
  
        for (let i = 0; i < this.lista_persistencia.length; i++) {
          // Verifica que Activo existe y es del tipo correcto
          console.log(`Registro ${i}: `, this.lista_persistencia[i]);
  
          // Si Activo no es una cadena, conviértelo
          if (typeof this.lista_persistencia[i].Activo !== 'string') {
            this.lista_persistencia[i].Activo = this.lista_persistencia[i].Activo.toString();
          }
  
          if (this.lista_persistencia[i].Activo.includes('1')) {
            this.validador = true;
            this.login = true;
            this.IdUsuario = this.lista_persistencia[i].IdUsuario;
            this.IdTipo = this.lista_persistencia[i].IdTipo;
            this.Correo = this.lista_persistencia[i].Correo;
            this.IdPersona = this.lista_persistencia[i].IdPersona;
          }
        }
  
        if (this.validador) {
          if (this.IdTipo == 1) {
            let parametros: NavigationExtras = {
              state: {
                idUsuario: this.IdUsuario,
                idTipo: this.IdTipo,
                login: this.login,
                correo: this.Correo,
                idPersona: this.IdPersona
              },
              replaceUrl: true
            }
            this.router.navigate(['cliente'], parametros);
          } else if (this.IdTipo == 2) {
            let parametros: NavigationExtras = {
              state: {
                idUsuario: this.IdUsuario,
                idTipo: this.IdTipo,
                login: this.login,
                correo: this.Correo,
                idPersona: this.IdPersona
              },
              replaceUrl: true
            }
            this.router.navigate(['psicologo'], parametros);
          }
        } else {
          this.router.navigate(['home']);
        }
  
      }).catch(error => {
        console.error('Error al obtener las sesiones:', error);
      });
    }, 3000);
  }

}


