import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/shared/authentication-service';
import { dbInstanceObj } from 'src/shared/behavior-obj';
import { FirestoreService } from 'src/shared/database-service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {
  public currentUser: any = null;
  public previousCurrentUser = null;
  public behaviors = [];
  public instancesCount = [];
  public behaviorNames = [];

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
      this.fsService.getLiveBehaviors(this.currentUser.uid).subscribe((data) => {
        this.behaviors = data.length ? data : [data];
        console.log(this.behaviors);
        this.countInstances();
        this.setBehaviorNames();
      });
    }
  }

  async countInstances() {
    var count = 0;
    this.instancesCount = [];
      this.behaviors.forEach(async (behavior) => {
        let arr = await this.fsService.getAllInstances(this.currentUser.uid, behavior.uid);
        count = arr.length;
        this.instancesCount.push(count);
      });
      console.log((this.instancesCount));
  }

  setBehaviorNames() {
    this.behaviors.forEach((b) => {
      this.behaviorNames.push(b.name);
    });
  }

  async countInstancesSpan(timespan: Number) {
    var count = 0;
    this.instancesCount = [];
    this.behaviors.forEach(async (behavior) => {
      let arr = await this.fsService.getInstancesInSpan(this.currentUser.uid, behavior.uid, timespan);
      count = arr.length;
      console.log(count);
      this.instancesCount.push(count);
    });
    console.log("new retrieved array: " + this.instancesCount);
  }

   //Formats date into number used in DB
   getDateNum(startDate: Date) {
    console.log(startDate);

    var year = startDate.getFullYear();
    var month = startDate.getMonth()+1;
    var day = startDate.getDate();
    var hours = startDate.getHours();
    var minutes = startDate.getMinutes();

    var yearStr = year.toString();
    var monthStr = month.toString();
    var dayStr = day.toString();
    var hoursStr = hours.toString();
    var minutesStr = minutes.toString();

    if(month < 10) {
      monthStr = '0' + monthStr;
    }
    if(day < 10) {
      dayStr = '0' + dayStr;
    }
    if(hours < 10) {
      hoursStr = '0' + hoursStr;
    }
    if(minutes < 10) {
      minutesStr = '0' + minutesStr;
    }

    let startDateStr = yearStr + monthStr + dayStr + hoursStr + minutesStr;
    let startDateNum = Number(startDateStr);
    console.log(startDateNum);

    return startDateNum;
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
