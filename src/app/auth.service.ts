import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { environment } from '../environments/environment'
import 'firebase/database';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  fb = firebase.initializeApp(environment.firebase);
  fAuth = firebase.auth();
  fdb = firebase.database()
  userInfo: any = {
    admin: false,
    trust: true,

  };
  constructor(
  ) { }

  signIn(email, pass) {
    return this.fAuth.signInWithEmailAndPassword(email, pass);
  }

  signOut() {
    return this.fAuth.signOut();
  }

  signUp(email, pass, name) {
    this.fAuth.createUserWithEmailAndPassword(email, pass)
    .then(snap => console.log(snap))
    .then(() => this.sendEmailVerification())
    .then(() => this.signOut());
  }

  sendEmailVerification() {
    return this.fAuth.currentUser.sendEmailVerification();
  }

  updateProfile(name) {
    this.fAuth.currentUser.updateProfile({
      displayName: name,
      photoURL: ""
    })
  }

}



