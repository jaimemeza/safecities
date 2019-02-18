import { Component, ChangeDetectorRef } from '@angular/core';

import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from './auth.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { Tab3Page } from './tab3/tab3.page';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  loader: any;

  constructor(
    private change: ChangeDetectorRef,
    private db: AngularFireDatabase,
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
      this.fbAuth.auth.onAuthStateChanged(async user => {
        // Check if the user exist and if the email have been verified
        if (user && user.emailVerified) {
          this.auth.userInfo = {
            name: user.displayName,
            email: user.email,
            uid: user.uid
          }
          await this.isTrust(this.auth.userInfo.uid);
          await this.updateName(this.auth.userInfo.uid, this.auth.userInfo.name);
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
          this.delUserInfo();
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

  // Save user information locally
  saveUserInfo(info) {
    // Uncomment when run on real device
    // return this.storage.setItem('userInfo',info);
    return localStorage.setItem('userInfo', JSON.stringify(info));
  }

  // Delete user information
  delUserInfo() {
    // Uncomment when run on real device
    // return this.storage.removeItem('userInfo');
    return localStorage.removeItem('userInfo');
  }

  updateName(uid, name) {
    return this.db.database.ref(`users/${uid}`).update({ displayName: name })
  }

  isTrust(uid) {
    this.db.object(`users/${uid}`).query.on('value', snap => {
      this.auth.userInfo['admin'] = snap.val().admin;
      this.auth.userInfo['trust'] = snap.val().trust;
      this.saveUserInfo(this.auth.userInfo);
      this.change.detectChanges();
    })
  }

}
