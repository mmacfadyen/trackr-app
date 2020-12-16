import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBehaviorPage } from './create-behavior.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBehaviorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBehaviorPageRoutingModule {}
