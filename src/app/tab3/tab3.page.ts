import { Component } from '@angular/core';
import { AuthenticationService } from 'src/shared/authentication-service';
import { FirestoreService } from 'src/shared/database-service';
import { dbUserObj } from 'src/shared/user-obj';
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
  private password: any = "";

  constructor(
    public tabsPage: TabsPage,
    public authService: AuthenticationService,
    public fsService: FirestoreService,
  ) {
  }

  signout() {
    this.authService.SignOut().then(() => {
      this.currentUser = null;
    });
  }

  save() {
    if(this.newName !== null && this.newName !== "") {
      this.updatedUser = this.currentUser;
      this.updatedUser.name = this.newName;
      this.fsService.updateUser(this.updatedUser);
    }
    if(this.password !== null && this.password !== "") {
      this.fsService.deleteUser(this.currentUser.uid);
    }
  }

  // deleteAccount() {
  //   this.updatedUser = this.currentUser;
  //   this.fsService.deleteUser(this.updatedUser);
  // }

  ngAfterContentChecked() {
    this.currentUser = this.tabsPage.currentUser;
    console.log(this.currentUser);
  }

}
