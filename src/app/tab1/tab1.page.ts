import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthenticationService } from 'src/shared/authentication-service';
import { SignUpPage } from '../sign-up/sign-up.page';
import { Router } from "@angular/router";

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {
  }

  createAccount() {
    this.router.navigate(['./create-account']);
  }

}
