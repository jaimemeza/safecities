import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private fbAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) { }

  signIn(email, pass) {
    return this.fbAuth.auth.signInWithEmailAndPassword(email,pass);
  }

  signOut() {
    return this.fbAuth.auth.signOut();
  }
}



