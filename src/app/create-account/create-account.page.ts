import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CreateAccountPage implements OnInit {
  email: string = "";
  password: string = "";
  confirmPassword: string = "";
  validForm: boolean = false;

  ngAfterContentChecked() {
    if (
      this.email &&
      this.password.length >= 8 &&
      this.password == this.confirmPassword
    ) {
      return (this.validForm = true);
    }
    this.validForm = false;
  }

  constructor(
    public toastCtrl: ToastController,
    private authService: AuthenticationService
  ) { }

  async createToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
    });
    toast.present();
  }

  async signup() {
    let userData = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
    };

    if (this.validForm) {
      this.authService
        .RegisterUser(userData.email, userData.password)
        .then((result) => {
          if (result.user) {
            this.authService.SendVerificationMail();
          }
        })
        .catch(async (err) => {
          await this.createToast(err.message);
        });
    } else {
      await this.createToast("Sign Up Failed");
    }
  }

  ngOnInit() {
  }

}
