import { Component, OnInit, ChangeDetectorRef, AfterContentInit, OnDestroy } from '@angular/core';
import { LogicService } from '../logic.service';
import { Storage } from '@ionic/storage';
import { AuthService } from '../auth.service';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit, OnDestroy {

  db = firebase.database();
  constructor(
    public logic: LogicService,
    private auth: AuthService,
    private storage: Storage,
    private change: ChangeDetectorRef
  ) {
    this.storage.get('savedAlerts')
      .then(savedAlerts => {
        if (savedAlerts) {
          this.logic.savedAlerts = savedAlerts;
        }
      })
  }


  ngOnInit() {
  }

  ngOnDestroy() {
  }

  openAlertCity(value) {
    console.log(value)
  }


}
