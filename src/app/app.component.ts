import { Component } from '@angular/core';

import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {

  loader: any;

  constructor(
    private auth: AuthService,
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
      this.fbAuth.auth.onAuthStateChanged(user => {
        // Check if the user exist and if the email have been verified
        if (user && user.emailVerified) {
          let userInfo = {
            name: user.displayName,
            email: user.email
          }
          this.saveInfo(userInfo);
          // Uncomment when run on real device
          // .then(()=> {console.log('Saved')})
          // .catch(err => {console.log('Not saved ' + err)})
          this.navCtrl.navigateRoot('');
        }
        // Check if the user exist and if the email haven't been verified
        else if (user && !user.emailVerified) {
          this.auth.signOut();
          this.navCtrl.navigateRoot('signIn');
        } else {
          this.navCtrl.navigateRoot('signIn');
        }
        this.loader.dismiss();
      })

    });
  }

  // Loading message
  async loading(msg) {
    this.loader = await this.loadingController.create({
      message: msg,
      translucent: true,
    });
    this.loader.present();
  }

  // Save information locally
  saveInfo(info) {
    // Uncomment when run on real device
    // return this.storage.setItem('userInfo',info);
    return localStorage.setItem('userInfo', JSON.stringify(info));
  }




}
