import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBehaviorPageRoutingModule } from './create-behavior-routing.module';

import { CreateBehaviorPage } from './create-behavior.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBehaviorPageRoutingModule
  ],
  declarations: [CreateBehaviorPage]
})
export class CreateBehaviorPageModule {}
