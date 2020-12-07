import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-instance',
  templateUrl: './create-instance.page.html',
  styleUrls: ['./create-instance.page.scss'],
})
export class CreateInstancePage implements OnInit {
  public doing: String = "";
  public feeling: String = "";

  constructor(
    public modalCtrl: ModalController,
  ) { }

  create() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalCtrl.dismiss({
      'dismissed': true,
      'doing': this.doing,
      'feeling' : this.feeling,
    });
  }

  cancel() {
    this.modalCtrl.dismiss({
      'dismissed': true
    })
  }

  ngOnInit() {
  }

}
