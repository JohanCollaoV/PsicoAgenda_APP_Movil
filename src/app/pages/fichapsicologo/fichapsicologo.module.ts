import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FichapsicologoPageRoutingModule } from './fichapsicologo-routing.module';

import { FichapsicologoPage } from './fichapsicologo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FichapsicologoPageRoutingModule
  ],
  declarations: [FichapsicologoPage]
})
export class FichapsicologoPageModule {}
