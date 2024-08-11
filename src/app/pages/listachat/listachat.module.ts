import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListachatPageRoutingModule } from './listachat-routing.module';

import { ListachatPage } from './listachat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListachatPageRoutingModule
  ],
  declarations: [ListachatPage]
})
export class ListachatPageModule {}
