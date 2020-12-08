import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/authentication-service';
import { FirestoreService } from 'src/shared/database-service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public currentUser: any = null;
  public previousCurrentUser = null;
  public behaviors = [];

  /*
    TODO: sign out button needs to make page 
          reload so effects take change
  */

  constructor(
    public authService: AuthenticationService,
    public fsService: FirestoreService,
    private app: AppComponent,
    public router: Router,
  ) {
  }

  ngOnInit() {
    this.retrieveBehaviors();
  }

  async retrieveBehaviors() {
    if(this.currentUser) {
      this.behaviors = this.fsService.getBehaviors(this.currentUser.uid);
    }
  }

  ngAfterContentChecked() {
    this.previousCurrentUser = this.currentUser;
    this.currentUser = this.app.currentUser;
    if (this.currentUser !== this.previousCurrentUser) {
      this.retrieveBehaviors();
      this.previousCurrentUser = this.currentUser;
    }
  }
}
