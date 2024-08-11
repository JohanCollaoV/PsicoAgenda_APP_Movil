import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListachatpsicologoPage } from './listachatpsicologo.page';

const routes: Routes = [
  {
    path: '',
    component: ListachatpsicologoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListachatpsicologoPageRoutingModule {}
