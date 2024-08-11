import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistropsicologoPageRoutingModule } from './registropsicologo-routing.module';

import { RegistropsicologoPage } from './registropsicologo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistropsicologoPageRoutingModule
  ],
  declarations: [RegistropsicologoPage]
})
export class RegistropsicologoPageModule {}
