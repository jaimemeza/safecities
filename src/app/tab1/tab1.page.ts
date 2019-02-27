import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private authServ: AuthService,
    private navCtrl: NavController
  ) { }

  logout() {
    this.authServ.signOut();
  }

  alert() {
    this.navCtrl.navigateForward('add-channel');
  }

}
