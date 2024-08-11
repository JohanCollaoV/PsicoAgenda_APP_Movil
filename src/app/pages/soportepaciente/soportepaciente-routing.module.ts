import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SoportepacientePage } from './soportepaciente.page';

const routes: Routes = [
  {
    path: '',
    component: SoportepacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SoportepacientePageRoutingModule {}
