import { Component } from '@angular/core';
import { TabsPage } from '../tabs/tabs.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public currentUser: any = null;

  constructor(
    public tabsPage: TabsPage
  ) {
  }

  ngAfterContentChecked() {
    this.currentUser = this.tabsPage.currentUser;
  }

}
