import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditarpsicologoPageRoutingModule } from './editarpsicologo-routing.module';

import { EditarpsicologoPage } from './editarpsicologo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditarpsicologoPageRoutingModule
  ],
  declarations: [EditarpsicologoPage]
})
export class EditarpsicologoPageModule {}
