import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistropacientePage } from './registropaciente.page';

const routes: Routes = [
  {
    path: '',
    component: RegistropacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistropacientePageRoutingModule {}
