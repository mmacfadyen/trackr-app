import { Component } from '@angular/core';
import { FirestoreService } from 'src/shared/database-service';
import { AppComponent } from '../app.component';
import { TabsPage } from '../tabs/tabs.page';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public currentUser: any = null;
  public behaviors = [];
  public behaviorNames = [];
  public instancesCount = [];
  public timespan;
  public date = new Date();

  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              beginAtZero: true
          }
      }]
  }
  };
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [], label: '' }
  ];

  constructor(
    public tabsPage: TabsPage,
    public fsService: FirestoreService,
    public app: AppComponent,
  ) {
  }


  segmentChanged(ev: any) {
    this.timespan = ev.detail.value;
    this.date = new Date();
    this.countInstances(this.timespan);
  }

  countInstances(timespan: any) {
    switch(timespan) {
      case 'all': {
        this.tabsPage.countInstances();
        this.barChartLabels = this.behaviorNames;
        this.barChartData[0].data = this.instancesCount;
        break;
      }
      case 'month': {
        var startDate = new Date(this.date);
        startDate.setMonth(this.date.getMonth() - 1);
        var startDateNum = this.tabsPage.getDateNum(startDate);
        this.tabsPage.countInstancesSpan(startDateNum);
        break;
      }
      case 'week': {
        var startDate = new Date(this.date);
        var durationInDays = 7;
        startDate.setDate(this.date.getDate() - durationInDays);
        var startDateNum = this.tabsPage.getDateNum(startDate);
        this.tabsPage.countInstancesSpan(startDateNum);
        break;
      }
      case 'day': {
        var startDate = new Date(this.date);
        startDate.setDate(this.date.getDate() - 1);
        var startDateNum = this.tabsPage.getDateNum(startDate);
        this.tabsPage.countInstancesSpan(startDateNum);
        break;
      }
    }
  }

 
  ngAfterContentChecked() {
    this.currentUser = this.tabsPage.currentUser;
    this.behaviors = this.tabsPage.behaviors;
    this.instancesCount = this.tabsPage.instancesCount;
    this.behaviorNames = this.tabsPage.behaviorNames;
    if(JSON.stringify(this.instancesCount) !== JSON.stringify(this.barChartData[0].data)) {
      console.log("assigning data to chart now");
      this.barChartLabels = this.behaviorNames;
      this.barChartData[0].data = this.instancesCount;
    }
  }

}
