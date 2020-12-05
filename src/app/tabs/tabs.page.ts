import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/authentication-service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public currentUser: any = null;
  public previousCurrentUser = null;

  /*
    TODO: sign out button needs to make page 
          reload so effects take change
  */

  constructor(
    public authService: AuthenticationService,
    private app: AppComponent,
    public router: Router,
  ) {
  }

  ngAfterContentChecked() {
    this.previousCurrentUser = this.currentUser;
    this.currentUser = this.app.currentUser;
    if (this.currentUser !== this.previousCurrentUser) {
      this.previousCurrentUser = this.currentUser;
    }
  }
}
