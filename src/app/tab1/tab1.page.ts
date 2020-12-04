import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  
  public currentUser: any = null;
  public previousCurrentUser = null;

  constructor(
    public authService: AuthenticationService,
    private app: AppComponent,
    public router: Router,
  ) {
  }

  ngAfterViewChecked() {
    this.previousCurrentUser = this.currentUser;
    this.currentUser = this.app.currentUser;

    if (this.currentUser !== this.previousCurrentUser) {
      this.previousCurrentUser = this.currentUser;
    }
  }


}
