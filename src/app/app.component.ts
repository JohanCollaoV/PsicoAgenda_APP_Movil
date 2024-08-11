import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private platform: Platform) {
    this.initializeApp();
  }

  async initializeApp() {
    this.platform.ready().then(async () => {
      // Solicitar permisos para notificaciones locales
      const { display } = await LocalNotifications.requestPermissions();
      if (display === 'granted') {
        console.log('Permisos de notificación local concedidos');
      } else {
        console.log('Permisos de notificación local denegados');
      }
    });
  }
}
