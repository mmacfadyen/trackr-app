import { Component } from '@angular/core';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';
import { CreateInstancePage } from '../create-instance/create-instance.page'
import { v4 as uuidv4 } from "uuid";
import { dbBehaviorObj, dbInstanceObj } from 'src/shared/behavior-obj';
import { FirestoreService } from 'src/shared/database-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public currentUser: any = null;
  public behaviors = [];
  public numRows: any = 0;

  constructor(
    public tabsPage: TabsPage,
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
    public toastCtrl: ToastController,
    public fsService: FirestoreService,
  ) {
  }

  ngAfterContentChecked() {
    this.currentUser = this.tabsPage.currentUser;
    this.behaviors = this.tabsPage.behaviors;
    this.numRows = this.behaviors.length/2;
  }

  async createToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
    });
    toast.present();
  }

  async presentInstancePopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: CreateInstancePage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });

    let currentDate = new Date();
    let minutes = currentDate.getMinutes().toString();
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }

    popover.onDidDismiss()
      .then((data) => {
        let behaviorId = ev.target.id;
        if(data['data'].doing || data['data'].feeling) {
          let instance: dbInstanceObj = {
            uid: uuidv4(),
            doing: data['data'].doing,
            feeling: data['data'].feeling,
            time: (
              currentDate.getMonth() +
              1 +
              "/" +
              currentDate.getDate() +
              "/" +
              currentDate.getFullYear() +
              " at " +
              currentDate.getHours() +
              ":" +
              minutes
            ).toString()
          }
          console.log(instance);
          this.fsService.createInstance(this.currentUser.uid, behaviorId, instance)
            .catch((err) => {
              console.log(err);
            });
        }
      })
    return await popover.present();
  }


}
