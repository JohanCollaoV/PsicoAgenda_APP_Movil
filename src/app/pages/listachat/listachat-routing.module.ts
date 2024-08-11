import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListachatPage } from './listachat.page';

const routes: Routes = [
  {
    path: '',
    component: ListachatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListachatPageRoutingModule {}
