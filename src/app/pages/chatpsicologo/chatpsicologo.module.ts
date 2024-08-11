import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatpsicologoPageRoutingModule } from './chatpsicologo-routing.module';

import { ChatpsicologoPage } from './chatpsicologo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatpsicologoPageRoutingModule
  ],
  declarations: [ChatpsicologoPage]
})
export class ChatpsicologoPageModule {}
