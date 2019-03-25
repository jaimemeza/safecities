import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';
import { LogicService } from '../logic.service';
import { database } from 'firebase/app';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private authServ: AuthService,
    private navCtrl: NavController,
    private logic: LogicService,
  ) {
    this.logic.isOnline();
  }

  logout() {
    this.authServ.signOut();
  }

  alert() {
    console.log(this.authServ.userInfo);
    this.navCtrl.navigateForward('add-channel');
  }
temp1 = 90
  sendAlert() {
    let temp = {
      timestamp: database.ServerValue.TIMESTAMP,
      body: 'test' + this.temp1++,
      title: 'Watch',
      topic: 'Rio Bravo',
      uid: this.authServ.userInfo.uid
    }

    this.logic.createAlert('Rio Bravo', temp);
  }

}
