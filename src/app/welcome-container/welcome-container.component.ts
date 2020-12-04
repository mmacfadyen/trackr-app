import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-welcome-container',
  templateUrl: './welcome-container.component.html',
  styleUrls: ['./welcome-container.component.scss'],
})
export class WelcomeContainerComponent implements OnInit {
  @Input() name: string;
  public currentUser: any = null;
  public previousCurrentUser = null;

  constructor(private app: AppComponent) { }

  ngOnInit() {}

  ngAfterContentChecked() {
    this.previousCurrentUser = this.currentUser;
    this.currentUser = this.app.currentUser;
    console.log(this.currentUser);
    if (this.currentUser !== this.previousCurrentUser) {
      this.previousCurrentUser = this.currentUser;
    }
  }

}
