import { Component } from '@angular/core';
import { ModalController, PopoverController, ToastController } from '@ionic/angular';
import { TabsPage } from '../tabs/tabs.page';
import { CreateInstancePage } from '../create-instance/create-instance.page'
import { v4 as uuidv4 } from "uuid";
import { dbBehaviorObj, dbInstanceObj } from 'src/shared/behavior-obj';
import { FirestoreService } from 'src/shared/database-service';
import { CreateBehaviorPage } from '../create-behavior/create-behavior.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public currentUser: any = null;
  public behaviors = [];
  public colors = ["wildblue","babyblue", "purpureus", "purplemountain"];
  public num = 4;

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
  }

  async createToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
    });
    toast.present();
  }

  //Creates new behavior
  async presentBehaviorPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: CreateBehaviorPage,
      cssClass: 'my-custom-class',
      event: ev,
      translucent: true,
      backdropDismiss: true,
    });

    popover.onDidDismiss()
      .then((data) => {
        if(data['data']) {
          if(data['data'].name) {
            let behavior: dbBehaviorObj = {
              uid: uuidv4(),
              name: data['data'].name
            }
            this.fsService.createBehavior(this.currentUser.uid, behavior)
              .catch((err) => {
                console.log(err);
              });
          }
        }
      })
    return await popover.present();
  }

  //Creates new instance of behavior
  createInstance(ev: any) {
    let currentDate = new Date();
    let minutes = currentDate.getMinutes().toString();
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }

    console.log(ev.target.id);
    let behaviorId = ev.target.id;
    let instance: dbInstanceObj = {
      uid: uuidv4(),
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
    this.fsService.createInstance(this.currentUser.uid, behaviorId, instance)
            .catch((err) => {
              console.log(err);
            });
  }

  deleteBehavior(ev:any) {
    let behaviorId = ev.target.id;
    this.fsService.deleteBehavior(this.currentUser.uid, behaviorId);
  }

  getColor(i: any) {
    return this.colors[i];
  }

  //Creates new instance of behavior with feeling and doing properties
  // async presentInstancePopover(ev: any) {
  //   const popover = await this.popoverCtrl.create({
  //     component: CreateInstancePage,
  //     cssClass: 'instance',
  //     event: ev,
  //     translucent: true
  //   });

  //   let currentDate = new Date();
  //   let minutes = currentDate.getMinutes().toString();
  //   if (minutes.length == 1) {
  //     minutes = "0" + minutes;
  //   }

  //   popover.onDidDismiss()
  //     .then((data) => {
  //       let behaviorId = ev.target.id;
  //       console.log(data);
  //       if(data['data'].doing || data['data'].feeling) {
  //         let instance: dbInstanceObj = {
  //           uid: uuidv4(),
  //           doing: data['data'].doing,
  //           feeling: data['data'].feeling,
  //           time: (
  //             currentDate.getMonth() +
  //             1 +
  //             "/" +
  //             currentDate.getDate() +
  //             "/" +
  //             currentDate.getFullYear() +
  //             " at " +
  //             currentDate.getHours() +
  //             ":" +
  //             minutes
  //           ).toString()
  //         }
  //         this.fsService.createInstance(this.currentUser.uid, behaviorId, instance)
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       }
  //     })
  //   return await popover.present();
  // }
}