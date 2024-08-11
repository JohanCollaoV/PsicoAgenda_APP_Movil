import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtencionespacientePageRoutingModule } from './atencionespaciente-routing.module';

import { AtencionespacientePage } from './atencionespaciente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtencionespacientePageRoutingModule
  ],
  declarations: [AtencionespacientePage]
})
export class AtencionespacientePageModule {}
