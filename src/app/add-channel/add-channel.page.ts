import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { LogicService } from '../logic.service';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Component({
  selector: 'app-add-channel',
  templateUrl: './add-channel.page.html',
  styleUrls: ['./add-channel.page.scss'],
})
export class AddChannelPage implements OnInit, OnDestroy {
  db = firebase.database();
  channels = {};
  userSubscriptions = {};


  constructor(
    private change: ChangeDetectorRef,
    public navCtrl: NavController,
    public logic: LogicService,
    private auth: AuthService
  ) {

    // Need to find a way to show 
    this.db.ref('cities').on('value', (snap) => {
      let allSub = snap.val();
      Object.keys(allSub).map(value => !allSub[value]['available'] ? delete allSub[value] : null);
      this.channels = allSub;
      this.db.ref(`users/${this.auth.userInfo.uid}/subscriptions`).on('value', (snap) => {
        let userSub = snap.val();
        if (userSub) {
          Object.keys(userSub).map(value => this.channels[value] ? this.channels[value]['added'] = true : null);
        }
      });

    })
  }


  ngOnInit() {
  }



  ngOnDestroy() {
    this.db.ref(`cities`).off('value');
    this.db.ref(`users/${this.auth.userInfo.uid}/subscriptions`).off();
  }

  removeSubscription(channel) {
    this.channels[channel]['added'] = false;
    this.db.ref(`messages/${channel}`).off('child_added');
    return this.db.ref(`users/${this.auth.userInfo.uid}/subscriptions/${channel}`).remove()
  }

  goBack() {
    this.navCtrl.navigateBack('');
  }



}
