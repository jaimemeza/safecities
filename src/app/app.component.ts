import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private navCtrl: NavController,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      var config = {
        apiKey: "AIzaSyBRkuz9w0HlMQ6zlZZr9FoTqmmwt0wAJb4",
        authDomain: "safe-cities-app.firebaseapp.com",
        databaseURL: "https://safe-cities-app.firebaseio.com",
        projectId: "safe-cities-app",
        storageBucket: "safe-cities-app.appspot.com",
        messagingSenderId: "621214668979"
      };
      firebase.initializeApp(config);
      
      firebase.auth().onAuthStateChanged((user)=> {
        if (user) {
         this.navCtrl.navigateRoot('');
        } else {
          this.navCtrl.navigateRoot('intro');
        }
        // firebase.auth().signInWithEmailAndPassword('jaimemezatx@gmail.com','12345678')
        // .then(resp => console.log('logged'));   
      })
  
    });
  }
}
