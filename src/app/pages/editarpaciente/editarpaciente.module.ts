import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarpacientePageRoutingModule } from './editarpaciente-routing.module';

import { EditarpacientePage } from './editarpaciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarpacientePageRoutingModule
  ],
  declarations: [EditarpacientePage]
})
export class EditarpacientePageModule {}
