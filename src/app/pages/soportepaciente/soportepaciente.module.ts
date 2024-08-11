import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SoportepacientePageRoutingModule } from './soportepaciente-routing.module';

import { SoportepacientePage } from './soportepaciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SoportepacientePageRoutingModule
  ],
  declarations: [SoportepacientePage]
})
export class SoportepacientePageModule {}
