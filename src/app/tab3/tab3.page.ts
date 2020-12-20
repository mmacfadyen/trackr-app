import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';
import { FirestoreService } from 'src/shared/database-service';
import { dbUserObj } from 'src/shared/user-obj';
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  public currentUser: any = null;
  public newName: any = "";
  public updatedUser: dbUserObj = null;

  constructor(
    public tabsPage: TabsPage,
    public authService: AuthenticationService,
    public fsService: FirestoreService,
    public router: Router,
    private app: AppComponent,
    public actionSheetController: ActionSheetController,
    public toastCtrl: ToastController,
  ) {
  }

  async createToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
    });
    toast.present();
  }

  ngAfterContentChecked() {
    this.currentUser = this.tabsPage.currentUser;
  }

  save() {
    if(this.newName !== null && this.newName !== "") {
      this.updatedUser = this.currentUser;
      this.updatedUser.name = this.newName;
      this.fsService.updateUser(this.updatedUser);
    }
  }

  
  signout() {
    this.authService.SignOut().then(() => {
      this.currentUser = null;
      this.createToast("sign out successful").then(async () => {
        await this.router.navigate(["../tabs/tab1"]);
        this.app.ngAfterContentInit();
      })
    });
  }

  deleteAccount() {
    this.fsService.deleteUser(this.currentUser.uid).then(() => {
      this.createToast("user deleted").then(async () => {
        await this.router.navigate(["../tabs/tab1"]);
        this.app.ngAfterContentInit();
      })
    });
  }

  async presentSignOut() {
    const actionSheet = await this.actionSheetController.create({
      header: 'do you really want to sign out?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'sign out',
        role: 'destructive',
        handler: () => {
          this.signout();
        }
      }]
    });
    await actionSheet.present();
  }

  async presentDeleteAccount() {
    const actionSheet = await this.actionSheetController.create({
      header: 'are you sure you want to delete your account?',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'delete account',
        role: 'destructive',
        handler: () => {
          this.deleteAccount();
        }
      }]
    });
    await actionSheet.present();
  }

}
