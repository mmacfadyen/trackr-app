import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateInstancePage } from './create-instance.page';

const routes: Routes = [
  {
    path: '',
    component: CreateInstancePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateInstancePageRoutingModule {}
