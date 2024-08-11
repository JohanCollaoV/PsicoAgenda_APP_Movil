import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AtencionespacientePage } from './atencionespaciente.page';

const routes: Routes = [
  {
    path: '',
    component: AtencionespacientePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AtencionespacientePageRoutingModule {}
