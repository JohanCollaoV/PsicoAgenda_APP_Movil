import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { File } from '@awesome-cordova-plugins//file/ngx';
import { FileOpener } from '@awesome-cordova-plugins//file-opener/ngx';
import { Platform } from '@ionic/angular'
import { DbService } from 'src/app/services/db.service';

@Component({
  selector: 'app-commitpay',
  templateUrl: './commitpay.page.html',
  styleUrls: ['./commitpay.page.scss'],
})
export class CommitpayPage implements OnInit {

  showOptions: boolean = false;
  transactionDetail: any;
  errorMessage: string = '';
  token_ws: string = '';
  idCita: number = 0;
  idPaciente: number = 0;
  login: boolean = false;
  correo: string = '';
  nombrePsicologo: string = '';
  fechaCita: string = '';
  horaCita: string = '';
  idTipo: number = 0;
  idUsuario: number = 0;
  error: boolean = false;
  idPersona: number = 0;

  constructor(private router: Router, private route: ActivatedRoute, private apiService: ApiService,
    private fileOpener: FileOpener, private platform: Platform, private file: File, private dbService: DbService) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      try {
        let parametros = this.router.getCurrentNavigation();
        if (parametros?.extras.state) {
          this.token_ws = parametros?.extras.state['token_ws'];
        }
        this.idCita = JSON.parse(localStorage.getItem('idCita') || '0');
        this.idTipo = JSON.parse(localStorage.getItem('idTipo') || '0');
        this.idPaciente = JSON.parse(localStorage.getItem('idPaciente') || '0');
        this.login = JSON.parse(localStorage.getItem('login') || 'false');
        this.correo = JSON.parse(localStorage.getItem('correo') || '');
        this.nombrePsicologo = JSON.parse(localStorage.getItem('nombrePsicologo') || '');
        this.fechaCita = JSON.parse(localStorage.getItem('fechaCita') || '');
        this.horaCita = JSON.parse(localStorage.getItem('horaCita') || '');
        this.idPersona = JSON.parse(localStorage.getItem('idPersona') || '0');
        this.idUsuario = JSON.parse(localStorage.getItem('idUsuario') || '0');
        console.log("ID USUARIO: " + this.idUsuario)
        console.log(this.idCita);
        console.log(this.idPaciente);
        console.log(this.correo);
        console.log(this.nombrePsicologo);
        console.log(this.fechaCita);
        console.log(this.horaCita);

        if (this.token_ws) {
          this.apiService.commitTransaction(this.token_ws).subscribe(
            (response) => {
              console.log("Pago Correcto");
              if (response.status === 'AUTHORIZED' && response.response_code === 0) {
                this.transactionDetail = {
                  card_number: response.card_detail.card_number,
                  transaction_date: new Date(response.transaction_date).toLocaleString(),
                  state: response.status === 'AUTHORIZED' ? 'Aceptado' : 'Rechazado',
                  pay_type: this.getPaymentType(response.payment_type_code),
                  amount: this.formatAmount(response.amount),
                  authorization_code: response.authorization_code,
                  buy_order: response.buy_order,
                };

                this.apiService.confirmarCita(this.idPaciente, 1, this.idCita).subscribe(
                  response => {
                    console.log('Cita Agendada Correctamente', response);
                  },
                  error => {
                    console.error('Error al agendar la cita', error);
                  }
                );
                this.sendEmail();
                localStorage.clear();
              } else {
                this.errorMessage = 'ERROR EN LA TRANSACCIÓN, SE RECHAZA LA TRANSACCIÓN.';
                this.error = true;
                localStorage.clear();
              }
            },
            (error) => {
              this.errorMessage = 'ERROR EN LA TRANSACCIÓN, SE CANCELO EL PAGO.';
              this.error = true;
              localStorage.clear();
            }
          );
        } else {
          this.errorMessage = 'ERROR EN LA TRANSACCIÓN, SE CANCELO EL PAGO.';
          this.error = true;
          localStorage.clear();
        }
      } catch (error) {
        console.error('Error parsing JSON', error);
        let parametros: NavigationExtras = {
          replaceUrl: true
        }
        this.router.navigate(['home'], parametros);
      }
    });
    this.reloadOnce();
  }

  reloadOnce() {
    // Verifica si la página ya ha sido recargada
    const reloaded = localStorage.getItem('pageReloaded');
    if (!reloaded) {
      // Si no ha sido recargada, recargarla y establecer la bandera en el almacenamiento local
      localStorage.setItem('pageReloaded', 'true');
      location.reload();
    } else {
      // Si ya ha sido recargada, eliminar la bandera
      localStorage.removeItem('pageReloaded');
    }
  }
  sendEmail() {
    const subject = 'Hora Agendada en PsicoAgenda';

    const text = 'Hola!,\n\nAgendaste una hora a traves de PsicoAgenda APP, revisa los detalles.' +
      '\n\nPsicologo: ' + this.nombrePsicologo +
      '\n\nFecha: ' + this.fechaCita +
      '\n\nHora: ' + this.horaCita +
      '\n\nTe Saluda,\nEquipo de PsicoAgenda APP.';

    const html = `
              <p>Hola!,</p>
              <p>Agendaste una hora a traves de PsicoAgenda APP, revisa los detalles.</p>
              <p><strong>Psicologo: ${this.nombrePsicologo}</strong></p>
              <p><strong>Fecha: ${this.fechaCita}</strong></p>
              <p><strong>Hora: ${this.horaCita}</strong></p>
              <p>Te Saluda,</p>
              <p>Equipo de PsicoAgenda APP.</p>
          `;

    this.apiService.sendEmail(this.correo, subject, text, html).subscribe(
      response => {
        console.log('Email Enviado Correctamente', response);
      },
      error => {
        console.error('Error al enviar correo', error);
      }
    );

  }

  downloadPDF() {
    const data = document.getElementById('PDF');

    if (data) {
      html2canvas(data, { scale: 2 }).then(canvas => {
        const imgWidth = 210; // Ancho de la página A4 en mm
        const pageHeight = 295; // Altura de la página A4 en mm
        const margin = 5; // Margen de 5mm
        const imgHeight = canvas.height * imgWidth / canvas.width;

        // Redimensionar para ajustar todo el contenido en una página
        const scale = Math.min(1, (pageHeight - 2 * margin) / imgHeight);
        const scaledWidth = imgWidth * scale - 2 * margin;
        const scaledHeight = imgHeight * scale;

        const doc = new jsPDF('p', 'mm', 'a4');

        // Centrar la imagen en la página
        const xPos = (imgWidth - scaledWidth) / 2;
        const yPos = margin;

        doc.addImage(canvas.toDataURL('image/png'), 'PNG', xPos, yPos, scaledWidth + 2 * margin, scaledHeight);

        const pdfOutput = doc.output();
        const buffer = new ArrayBuffer(pdfOutput.length);
        const array = new Uint8Array(buffer);
        for (let i = 0; i < pdfOutput.length; i++) {
          array[i] = pdfOutput.charCodeAt(i);
        }

        const fileName = `Comprobante_${this.idCita}.pdf`;

        if (this.platform.is('cordova')) {
          this.file.writeFile(this.file.dataDirectory, fileName, buffer, { replace: true }).then(fileEntry => {
            this.fileOpener.open(fileEntry.nativeURL, 'application/pdf');
          }).catch(error => {
            console.error('Error writing file', error);
          });
        } else {
          const blob = new Blob([buffer], { type: 'application/pdf' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      });
    }
  }


  toggleOptions() {
    this.showOptions = !this.showOptions;
  }

  redirectTo(route: string) {
    this.router.navigate([route]);
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

  goSoporte() {
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

  goEditar() {
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

  private getPaymentType(code: string): string {
    switch (code) {
      case 'VD':
        return 'Tarjeta de Débito';
      // Agrega otros casos según sea necesario
      default:
        return 'Desconocido';
    }
  }

  private formatAmount(amount: number): string {
    return amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' });
  }

}
