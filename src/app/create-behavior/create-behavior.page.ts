import { Component, OnInit } from '@angular/core';
import { ModalController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-create-behavior',
  templateUrl: './create-behavior.page.html',
  styleUrls: ['./create-behavior.page.scss'],
})
export class CreateBehaviorPage implements OnInit {

  public name: String = "";

  constructor(
    public modalCtrl: ModalController,
    public popoverCtrl: PopoverController,
  ) { }

  create() {
    this.popoverCtrl.dismiss({
      'dismissed': true,
      'name': this.name
    });
  }

  cancel() {
    this.popoverCtrl.dismiss({
      'dismissed': true
    })
  }

  ngOnInit() {
  }

}
