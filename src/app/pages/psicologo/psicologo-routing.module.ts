import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PsicologoPage } from './psicologo.page';

const routes: Routes = [
  {
    path: '',
    component: PsicologoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PsicologoPageRoutingModule {}
