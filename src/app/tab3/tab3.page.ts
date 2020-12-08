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

  constructor(
    public tabsPage: TabsPage,
    public authService: AuthenticationService,
    public fsService: FirestoreService,
  ) {
  }

  ngAfterContentChecked() {
    this.currentUser = this.tabsPage.currentUser;
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
  }

  deleteAccount() {
    this.fsService.deleteUser(this.currentUser.uid);
  }

}
