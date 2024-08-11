import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistorialpsicologoPageRoutingModule } from './historialpsicologo-routing.module';

import { HistorialpsicologoPage } from './historialpsicologo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistorialpsicologoPageRoutingModule
  ],
  declarations: [HistorialpsicologoPage]
})
export class HistorialpsicologoPageModule {}
