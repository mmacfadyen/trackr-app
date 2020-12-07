import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';
import { CreateInstancePage } from '../create-instance/create-instance.page'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public currentUser: any = null;

  constructor(
    public tabsPage: TabsPage,
    public modalCtrl: ModalController,
  ) {
  }

  async presentModal() {
    const modal = await this.modalCtrl.create({
      component: CreateInstancePage,
      cssClass: 'my-custom-class'
    });

    modal.onDidDismiss()
      .then((data) => {
        if(data['data'].doing) {
          console.log("entered something");
          console.log(data['data']);
        }
        const user = data['data']; // Here's your selected user!
    });

    return await modal.present();
  }

  ngAfterContentChecked() {
    this.currentUser = this.tabsPage.currentUser;
    console.log(this.currentUser);
  }


}
