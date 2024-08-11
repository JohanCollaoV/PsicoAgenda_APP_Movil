import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarpacientePage } from './editarpaciente.page';

const routes: Routes = [
  {
    path: '',
    component: EditarpacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarpacientePageRoutingModule {}
