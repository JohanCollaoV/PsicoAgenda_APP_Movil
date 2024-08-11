import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TiporegistroPage } from './tiporegistro.page';

const routes: Routes = [
  {
    path: '',
    component: TiporegistroPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TiporegistroPageRoutingModule {}
