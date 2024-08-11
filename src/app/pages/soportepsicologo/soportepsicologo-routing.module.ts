import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoportepsicologoPage } from './soportepsicologo.page';

const routes: Routes = [
  {
    path: '',
    component: SoportepsicologoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoportepsicologoPageRoutingModule {}
