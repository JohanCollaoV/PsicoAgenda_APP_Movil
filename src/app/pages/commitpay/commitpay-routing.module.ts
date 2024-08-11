import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommitpayPage } from './commitpay.page';

const routes: Routes = [
  {
    path: '',
    component: CommitpayPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommitpayPageRoutingModule {}
