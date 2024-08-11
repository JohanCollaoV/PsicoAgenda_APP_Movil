export class Usuario {
    IdUsuario: number;
    Activo: string;
    IdTipo: number;
    Correo: string;
    IdPersona: number;

    constructor() {
        this.IdUsuario = 0;
        this.Activo = '';
        this.IdTipo = 0;
        this.Correo = '';
        this.IdPersona = 0;
    }
}
