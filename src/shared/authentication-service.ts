import { Injectable, NgZone } from "@angular/core";
import { auth } from "firebase/app";
import { User } from "./auth";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { NavController, ToastController } from "@ionic/angular";
import { first } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthenticationService {
  userData: any;
  user: User;

  constructor(
    public toastCtrl: ToastController,
    public ngFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    private navCtrl: NavController
  ) {}

  getUser() {
    return this.ngFireAuth.authState
      .pipe(first())
      .toPromise()
      .then((user) => {
        return user;
      });
  }

  async createToast(message: string) {
    const toast = await this.toastCtrl.create({
      message: message,
      duration: 5000,
    });
    toast.present();
  }

  // Login in with email/password
  SignIn(email, password) {
    return this.ngFireAuth.signInWithEmailAndPassword(email, password);
  }

  // Register user with email/password
  RegisterUser(email, password) {
    return this.ngFireAuth.createUserWithEmailAndPassword(email, password);
  }

  // Email verification when new user register
  SendVerificationMail() {
    return this.ngFireAuth.currentUser
      .then((user) => {
        user.sendEmailVerification();
      })
      .then(() => {
        this.router.navigate(["verify-email"]);
      });
  }

  // Recover password
  PasswordRecover(email) {
    return this.ngFireAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.createToast(
          "Password reset email has been sent, please check your inbox."
        );
      })
      .catch((error) => {
        this.createToast(error);
      });
  }

  // Update password
  ChangePassword(email) {
    return this.ngFireAuth
      .sendPasswordResetEmail(email)
      .then(() => {
        this.createToast(
          "An email to change your password has been sent, please check your inbox."
        ).then(() => this.router.navigate(["sign-in"]));
      })
      .catch((error) => {
        this.createToast(error);
      });
  }

  // Returns true when user's email is verified
  isEmailVerified() {
    this.getUser().then((user) => {
      if (user) {
        return user.emailVerified;
      } else {
        return undefined;
      }
    });
  }

  // Sign in with Gmail
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  }

  // Auth providers
  AuthLogin(provider) {
    return this.ngFireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.ngZone.run(() => {
          this.router.navigate(["dashboard"]);
        });
        // this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  // Sign-out
  SignOut() {
    return this.ngFireAuth.signOut().then(() => {
      this.createToast("Sign Out Successful").then(async () => {
        await this.router.navigate(["disaster-dashboard"]);
      });
    });
  }
}
