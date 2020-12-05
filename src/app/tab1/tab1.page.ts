import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';
import { Router } from "@angular/router";
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  public currentUser: any = null;

  constructor(
    public tabsPage: TabsPage
  ) {
  }

  ngAfterContentChecked() {
    this.currentUser = this.tabsPage.currentUser;
    console.log(this.currentUser);
  }


}
