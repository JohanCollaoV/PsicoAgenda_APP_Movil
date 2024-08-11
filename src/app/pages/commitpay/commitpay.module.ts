import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommitpayPageRoutingModule } from './commitpay-routing.module';

import { CommitpayPage } from './commitpay.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommitpayPageRoutingModule
  ],
  declarations: [CommitpayPage]
})
export class CommitpayPageModule {}
