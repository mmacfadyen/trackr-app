import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from 'src/shared/authentication-service';
import { FirestoreService } from 'src/shared/database-service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public currentUser: any = null;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthenticationService,
    private fsService: FirestoreService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  
  signout() {
    this.authService.SignOut().then(() => {
      this.currentUser = null;
    });
  }

  ngAfterContentInit() {
    this.refreshUser();
  }

  refreshUser() {
    this.authService.getUser().then((user) => {
      if (user) {
        this.fsService.getUser(user.uid).then((dbUser) => {
          this.currentUser = dbUser;
        });
      } else {
        this.currentUser = null;
      }
    });
  }

  ngAfterViewChecked() {
    this.currentUser = this.currentUser;
  }

  ngOnInit() {}
}
