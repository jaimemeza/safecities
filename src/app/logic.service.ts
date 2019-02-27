import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogicService {

  constructor(
    private db: AngularFireDatabase,
    private auth: AuthService
  ) { }

  createCity(city) {
    return this.db.database.ref(`cities/${city}`).update({ available: true })
  }
  suspendCity(city) {
    return this.db.database.ref(`cities/${city}`).update({ available: false })
  }

  removeCity(city) {
    return this.db.database.ref(`cities/${city}`).remove()
  }

  createSubscription(city) {
    return this.db.database.ref(`users/${this.auth.userInfo.uid}/subscriptions`).update({[city]: true})
  }

  removeSubscription(city) {
    return this.db.database.ref(`users/${this.auth.userInfo.uid}/subscriptions/${city}`).remove()
  }



}
