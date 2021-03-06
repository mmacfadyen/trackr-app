import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { WelcomeContainerComponentModule } from '../welcome-container/welcome-container.module';
import { ChartsModule } from 'ng2-charts';
import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    WelcomeContainerComponentModule,
    Tab2PageRoutingModule,
    ChartsModule,
  ],
  declarations: [Tab2Page]
})
export class Tab2PageModule {}
