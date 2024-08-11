import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatpsicologoPage } from './chatpsicologo.page';

const routes: Routes = [
  {
    path: '',
    component: ChatpsicologoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatpsicologoPageRoutingModule {}
