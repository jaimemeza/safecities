import { Component } from '@angular/core';

import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  loader:any;

  constructor(
    private fbAuth: AngularFireAuth,
    private navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public loadingController: LoadingController
  ) {
    this.initializeApp();
  }

  async initializeApp() {

    await this.loading('Loading');

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.loader.dismiss();
      
      this.fbAuth.auth.onAuthStateChanged(user => {
        if (user) {
          this.navCtrl.navigateRoot('');
        } else {
          this.navCtrl.navigateRoot('signIn');
        }
      })

    });
  }

  // Loading message
  async loading(msg) {
    this.loader= await this.loadingController.create({
      message: msg,
      translucent: true,
    });
    this.loader.present();
  }



  
}
