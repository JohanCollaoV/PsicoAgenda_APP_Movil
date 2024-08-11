import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistorialpsicologoPage } from './historialpsicologo.page';

const routes: Routes = [
  {
    path: '',
    component: HistorialpsicologoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistorialpsicologoPageRoutingModule {}
