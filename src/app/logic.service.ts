import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Storage } from '@ionic/storage';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase/app';
import 'firebase/database';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor(
    private auth: AuthService,
    private storage: Storage,
    public toast: ToastController

  ) { }
  db = firebase.database();
  alerts: Object;
  savedAlerts: Array<object>;
  connected: Boolean;


  createCity(city) {
    return this.db.ref(`cities/${city}`).update({ available: true })
  }
  suspendCity(city) {
    return this.db.ref(`cities/${city}`).update({ available: false })
  }
  removeCity(city) {
    return this.db.ref(`cities/${city}`).remove()
  }


  createSubscription(city) {
    this.listenSubscription(city)

    return this.db.ref(`users/${this.auth.userInfo.uid}/subscriptions`).update({ [city]: { show: true } })
  }





  listenSubscription(city) {
    this.db.ref(`messages/${city}`).orderByChild('timestamp').limitToLast(1).startAt(Date.now()).on('child_added', snap => {

      this.saveNewAlert(city, snap.val());


    })
  }

  // Create a new alert
  createAlert(city, alert) {
    return this.db.ref(`messages/${city}`).push(alert);
  }

  // Track the connection to the database
  isOnline() {
    return this.db.ref('.info/connected').on('value', snap => {
      this.connected = snap.val();
      // this.createToast(this.connected ? 'Connected' : 'No Connected', this.connected ? 'primary' : 'danger');

    })
  }


  saveNewAlert(city, alert) {
    this.storage.get('savedAlerts')
      .then((value: Array<Object>) => {
        let tempObj = {
          city: city,
          lastAlert: alert.body,
          timestamp: alert.timestamp
        }
        if (value) {
          let index = value.findIndex(obj => obj['city'] == city);
          console.log(index);
          if (index === value.length - 1) {
            value[index] = tempObj;
          } else if (index >= 0 && index < value.length - 1) {
            value[index] = tempObj;
            value.push(value.splice(index, 1)[0])
          } else if (index === -1) {
            value.push(tempObj);
          }
          this.storage.set('savedAlerts', value).then(newVal => this.savedAlerts = newVal)
        } else {
          this.storage.set('savedAlerts', [tempObj]).then(newVal => this.savedAlerts = newVal)
        }
      })

    this.storage.get(city)
      .then((value: Array<any>) => {
        if (value) {
          value.push(alert);
          this.createToast(alert.body, 'primary');
          return this.storage.set(city, value);
        } else {
          return this.storage.set(city, [alert]);
        }
      })

  }



  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }


  async createToast(msg,color) {
    const toast = await this.toast.create({
      message: msg,
      showCloseButton: true,
      color: color,
      duration: 2000
    });
    toast.present();
  }

}
