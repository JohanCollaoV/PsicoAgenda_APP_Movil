import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PsicologoPageRoutingModule } from './psicologo-routing.module';

import { PsicologoPage } from './psicologo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PsicologoPageRoutingModule
  ],
  declarations: [PsicologoPage]
})
export class PsicologoPageModule {}
