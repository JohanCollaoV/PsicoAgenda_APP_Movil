import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FichapsicologoPage } from './fichapsicologo.page';

const routes: Routes = [
  {
    path: '',
    component: FichapsicologoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FichapsicologoPageRoutingModule {}
