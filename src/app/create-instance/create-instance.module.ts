import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateInstancePageRoutingModule } from './create-instance-routing.module';

import { CreateInstancePage } from './create-instance.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateInstancePageRoutingModule
  ],
  declarations: [CreateInstancePage]
})
export class CreateInstancePageModule {}
