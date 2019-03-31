import { Component, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './auth.service';
import { LogicService } from './logic.service';
import { Storage } from '@ionic/storage';
import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/messaging'



@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  fdb = firebase.database();
  fAuth = firebase.auth();
  msg;
  browserNotSupported = false;


  loader: any;

  constructor(
    private change: ChangeDetectorRef,
    private authService: AuthService,
    private navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public loadingController: LoadingController,
    private logic: LogicService,
    private storage: Storage
  ) {
    if (firebase.messaging.isSupported()) {
      this.msg = firebase.messaging();
      this.browserNotSupported = true;
    }
    this.initializeApp();
  }

  async initializeApp() {

    await this.loading('Loading');

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fAuth.onAuthStateChanged(async user => {
        // Check if the user exist and if the email have been verified
        if (user && user.emailVerified) {
          this.authService.userInfo = {
            name: user.displayName,
            email: user.email,
            uid: user.uid
          }

          if (this.browserNotSupported) {
            this.msg.getToken().then(token => { console.log(token) });
          }

          await this.isTrust(this.authService.userInfo.uid);
          await this.updateName(this.authService.userInfo.uid, this.authService.userInfo.name);
          // Uncomment when run on real device
          // .then(()=> {console.log('Saved')})
          // .catch(err => {console.log('Not saved ' + err)})
          this.navCtrl.navigateRoot('');
        }
        // Check if the user exist and if the email haven't been verified
        else if (user && !user.emailVerified) {
          this.authService.signOut();
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
    this.fdb.ref(`users/${uid}`).update({ status: 'online' })
    this.fdb.ref(`users/${uid}`).onDisconnect().update({ status: 'offline' });
    return this.fdb.ref(`users/${uid}`).update({ displayName: name })
  }

  isTrust(uid) {
    this.fdb.ref(`users/${uid}`).on('value', snap => {
      this.authService.userInfo['type'] = snap.val().type;
      this.authService.userInfo['trustLevel'] = snap.val().trustLevel;
      this.authService.userInfo['subscriptions'] = snap.val().subscriptions;
      this.saveUserInfo(this.authService.userInfo);
      this.change.detectChanges();
    })

    this.fdb.ref(`users/${uid}/subscriptions`).once('value', snap => {
      if (!snap.val()) return
      let subscriptions = Object.keys(snap.val());
      subscriptions.map(city => {
        this.logic.listenSubscription(city)
      })
      this.change.detectChanges();
    })
  }
}
