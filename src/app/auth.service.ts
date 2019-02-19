import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userInfo: any = {
    admin: false,
    trust: true,
    
  };
  constructor(
    private fbAuth: AngularFireAuth
  ) { }

  signIn(email, pass) {
    return this.fbAuth.auth.signInWithEmailAndPassword(email,pass);
  }

  signOut() {
    return this.fbAuth.auth.signOut();
  }

  signUp(email, pass) {
    return this.fbAuth.auth.createUserWithEmailAndPassword(email, pass);
  }

  sendEmailVerification() {
    return this.fbAuth.auth.currentUser.sendEmailVerification();
  }

  updateProfile(name) {
    this.fbAuth.auth.currentUser.updateProfile({
      displayName: name,
      photoURL: ""
    })
  }
  
}



