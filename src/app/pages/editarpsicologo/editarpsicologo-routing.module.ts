import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditarpsicologoPage } from './editarpsicologo.page';

const routes: Routes = [
  {
    path: '',
    component: EditarpsicologoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditarpsicologoPageRoutingModule {}
