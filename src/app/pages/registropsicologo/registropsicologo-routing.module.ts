import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistropsicologoPage } from './registropsicologo.page';

const routes: Routes = [
  {
    path: '',
    component: RegistropsicologoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistropsicologoPageRoutingModule {}
