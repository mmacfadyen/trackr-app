import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';
import { FirestoreService} from 'src/shared/database-service';
import { dbUserObj } from 'src/shared/user-obj';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {

  public userEmail: string;
  name: string = "";

  constructor(
    private authService: AuthenticationService,
    private fsService: FirestoreService,
    private toastCtrl: ToastController,
    private router: Router) {
      this.authService.getUser().then((user) => {
        if (user) {
          this.userEmail = user.email;
        }
      });
  }

  async createToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
    });
    toast.present();
  }

  getUserData() {
    this.authService.getUser().then((user) => {
      if (user) {
        this.userEmail = user.email;
        let userData: dbUserObj = {
          email: user.email,
          uid: user.uid,
          name: this.name
        }
        this.createUser(userData);
      }
    });
    
  }

  async createUser(user: dbUserObj) {
    this.fsService
      .createUser(user)
      .then(() => {
        this.createToast("user info saved").then(async () => {
          await this.router.navigate(["../tabs/tab1"]);
          window.location.reload();
        })
      })
      .catch((error) => console.log(error));
  }

  ngOnInit() {
  }


}
