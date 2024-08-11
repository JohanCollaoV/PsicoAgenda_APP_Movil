import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbInstance: SQLiteObject | undefined;

  constructor(private sqlite: SQLite, private platform: Platform) {
    this.initializeDatabase();
  }

  async initializeDatabase() {
    try {
      await this.platform.ready();
      this.dbInstance = await this.sqlite.create({
        name: 'data.db',
        location: 'default'
      });

      await this.dbInstance.executeSql('CREATE TABLE IF NOT EXISTS Usuario (IdUsuario INTEGER PRIMARY KEY, Activo INTEGER, IdTipo INTEGER, Correo TEXT, IdPersona INTEGER)', []);
      console.log('FSR: TABLA CREADA OK');
    } catch (e) {
      console.error('FSR: Error initializing database', e);
    }
  }

  async obtenerTodasLasSesiones(): Promise<Usuario[]> {
    if (!this.dbInstance) {
      console.error('FSR: Database not initialized');
      return [];
    }

    try {
      const data = await this.dbInstance.executeSql('SELECT IdUsuario, Activo, IdTipo, Correo, IdPersona FROM Usuario', []);
      const lista_sesiones: Usuario[] = [];

      for (let x = 0; x < data.rows.length; x++) {
        lista_sesiones.push(data.rows.item(x));
      }

      return lista_sesiones;
    } catch (e) {
      console.error('FSR: Error obteniendo sesiones', e);
      return [];
    }
  }

  async crearSesion(usuario: number, activo: string, idTipo: number, correo: string, idPersona: number): Promise<void> {
    if (!this.dbInstance) {
      console.error('FSR: Database not initialized');
      return;
    }

    try {
      await this.dbInstance.executeSql('INSERT INTO Usuario (IdUsuario, Activo, IdTipo, Correo, IdPersona) VALUES (?, ?, ?, ?, ?)', [usuario, activo, idTipo, correo, idPersona]);
      console.log('FSR: SESION CREADA');
    } catch (e) {
      console.error('FSR: Error creando sesión', e);
    }
  }

  async actualizarSesion(activo: string, usuario: number): Promise<void> {
    if (!this.dbInstance) {
      console.error('FSR: Database not initialized');
      return;
    }

    try {
      await this.dbInstance.executeSql('UPDATE Usuario SET Activo = ? WHERE IdUsuario = ?', [activo, usuario]);
      console.log('FSR: SESION ACTUALIZADA');
    } catch (e) {
      console.error('FSR: Error actualizando sesión', e);
    }
  }

  async limpiarTablaUsuario(): Promise<void> {
    if (!this.dbInstance) {
      console.error('FSR: Database not initialized');
      return;
    }

    try {
      await this.dbInstance.executeSql('DELETE FROM Usuario', []);
      console.log('FSR: TABLA USUARIO LIMPIADA');
    } catch (e) {
      console.error('FSR: Error limpiando tabla Usuario', e);
    }
  }
}
