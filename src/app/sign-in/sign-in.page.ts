import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  email: string = "";
  password: string = "";
  validForm: boolean = false;

  ngAfterContentChecked() {
    if (this.email && this.password) {
      return (this.validForm = true);
    }
    this.validForm = false;
  }

  constructor(
    public toastCtrl: ToastController,
    public router: Router,
    private authService: AuthenticationService,
    private app: AppComponent
  ) {}

  async createToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
    });
    toast.present();
  }

  async signin() {
    let userData = {
      email: this.email,
      password: this.password,
    };

    if (this.validForm) {
      this.authService
        .SignIn(userData.email, userData.password)
        .then((result) => {
          if (result.user) {
            this.createToast("Sign In Successful").then(async () => {
              await this.router.navigate(["../tabs/tab1"]);
              this.app.ngAfterContentInit();
            });
          }
        })
        .catch(async (err) => {
          console.error(err);
          await this.createToast(err.message);
        });
    } else {
      await this.createToast("Sign In Failed");
    }
  }

  ngOnInit() {
  }

}
