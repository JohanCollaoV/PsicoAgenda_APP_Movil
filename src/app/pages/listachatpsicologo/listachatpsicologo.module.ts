import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListachatpsicologoPageRoutingModule } from './listachatpsicologo-routing.module';

import { ListachatpsicologoPage } from './listachatpsicologo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListachatpsicologoPageRoutingModule
  ],
  declarations: [ListachatpsicologoPage]
})
export class ListachatpsicologoPageModule {}
