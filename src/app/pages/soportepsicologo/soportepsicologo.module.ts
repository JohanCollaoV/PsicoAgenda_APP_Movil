import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoportepsicologoPageRoutingModule } from './soportepsicologo-routing.module';

import { SoportepsicologoPage } from './soportepsicologo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoportepsicologoPageRoutingModule
  ],
  declarations: [SoportepsicologoPage]
})
export class SoportepsicologoPageModule {}
