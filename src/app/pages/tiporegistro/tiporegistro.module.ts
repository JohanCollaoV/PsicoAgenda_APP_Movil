import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TiporegistroPageRoutingModule } from './tiporegistro-routing.module';

import { TiporegistroPage } from './tiporegistro.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TiporegistroPageRoutingModule
  ],
  declarations: [TiporegistroPage]
})
export class TiporegistroPageModule {}
