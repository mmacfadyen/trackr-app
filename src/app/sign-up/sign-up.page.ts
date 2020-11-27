import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ToastController, ModalController, NavParams } from "@ionic/angular";
import { dbUserObj } from 'src/shared/user-obj';
import { AuthenticationService } from "../../shared/authentication-service";
import { FirestoreService } from "../../shared/database-service";
import { v4 as uuidv4 } from "uuid";

@Component({
  selector: 'sign-up-page',
  templateUrl: "./sign-up.page.html",
  styleUrls: ["./sign-up.page.scss"],
})
export class SignUpPage implements OnInit {
    name: string = "";
    email: string = "";
    password: string = "";
    confirmPassword: string ="";
    validForm: boolean = false;

    ngAfterContentChecked() {
        if (this.name && this.email && this.password && this.confirmPassword) {
          return (this.validForm = true);
        }
        this.validForm = false;
      }


  constructor(
    public toastCtrl: ToastController,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public authService: AuthenticationService,
    public fsService: FirestoreService,
  ) {
  }

  async createToast(message: string) {
      const toast = await this.toastCtrl.create({
          message: message,
          duration: 5000,
      });
      toast.present();
  }
  async editPost() {
      if (this.validForm) {
          console.log("valid form");
          const user: dbUserObj = {
              uid: uuidv4(),
              name: this.name,
              email: this.email
          }

      }
  }

//   async editPost() {
//     if (this.validForm) {
//         console.log("valid form");
//           const user: dbUserObj = {
//               uid: uuidv4(),
//               name: this.name,
//               email: this.email
//           };
//           this.fsService
//             .createUser(user)
//             .then(() => {
//               this.createToast("User Created").then(async () => {
//                 this.modalCtrl.dismiss(true);
//               });
//             })
//             .catch((error) => console.error(error));
//       }
//     }

  async closeModal() {
    this.modalCtrl.dismiss(false);
  }

  ngOnInit() {}

}