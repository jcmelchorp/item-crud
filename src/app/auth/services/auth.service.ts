import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { from, Observable } from 'rxjs';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from '@angular/fire/database';
import { User } from '../models/user.model';
// import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$: Observable<firebase.User>;
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
  ) {
    /* this.initClient();
    this.user$ = afAuth.authState; */
  }
  // Initialize the Google API client with desired scopes
  /* initClient() {
    gapi.load('client', () => {
      console.log('loaded client')

      // It's OK to expose these credentials, they are client safe.
      gapi.client.init({
        apiKey: environment.firebaseConfig.apiKey,
        clientId: environment.firebaseConfig.clientId,
        discoveryDocs: environment.firebaseConfig.discoveryDocs,
        scope: environment.firebaseConfig.scopes
      })
      gapi.client.load('classroom', 'v1', () => console.log('loaded classroom'));
    });
  } */
  register(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.createUserWithEmailAndPassword(email, password));
  }

  updateProfile(
    displayName: string,
    photoUrl: string
  ): Observable<firebase.User> {
    const userProfile = this.afAuth.currentUser;
    if (userProfile) {
      /* return;
      from(
        userProfile.updateProfile({
          displayName: displayName,
          photoURL: photoUrl,
        })
      ); */

      return from(userProfile) as any;
    }
  }

  login(
    email: string,
    password: string
  ): Observable<firebase.auth.UserCredential> {
    return from(this.afAuth.signInWithEmailAndPassword(email, password));
  }

  socialLogin(authProvider: string): Observable<firebase.auth.UserCredential> {
    let provider: any;
    if (authProvider === 'google') {
      provider = new firebase.auth.GoogleAuthProvider();
      provider.addScope('email');
      provider.addScope('profile');
      provider.addScope('openid');
      provider.addScope(
        'https://www.googleapis.com/auth/classroom.announcements'
      );
      provider.addScope('https://www.googleapis.com/auth/classroom.courses');
      provider.addScope(
        'https://www.googleapis.com/auth/classroom.coursework.me'
      );
      provider.addScope(
        'https://www.googleapis.com/auth/classroom.coursework.students'
      );
      provider.addScope(
        'https://www.googleapis.com/auth/classroom.guardianlinks.students'
      );
      provider.addScope(
        'https://www.googleapis.com/auth/classroom.profile.emails'
      );
      provider.addScope(
        'https://www.googleapis.com/auth/classroom.profile.photos'
      );
      provider.addScope(
        'https://www.googleapis.com/auth/classroom.push-notifications'
      );
      provider.addScope('https://www.googleapis.com/auth/classroom.rosters');
      provider.addScope('https://www.googleapis.com/auth/classroom.topics');
      provider.addScope('https://www.googleapis.com/auth/userinfo.email');
      provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
      provider.addScope('https://www.googleapis.com/auth/admin.directory.user');
    }

    if (authProvider === 'facebook') {
      provider = new firebase.auth.FacebookAuthProvider();
    }

    if (authProvider === 'twitter') {
      provider = new firebase.auth.TwitterAuthProvider();
    }
    return from(this.afAuth.signInWithPopup(provider));
  }

  logout(uid: string): Observable<void> {
    this.updateOnlineStatus(uid, false);
    return from(this.afAuth.signOut());
  }

  saveUser(user: User): Promise<void> {
    const users = this.db.object('users/' + user.uid);
    return users.set(user);
  }

  updateOnlineStatus(uid: string, status: boolean): Observable<void> {
    if (status) {
      this.db.database
        .ref()
        .child('users/' + uid)
        .onDisconnect()
        .update({ isOnline: false });
    }
    return from(this.db.object('users/' + uid).update({ isOnline: status }));
  }

  checkUserRole(uid: string): Observable<unknown> {
    return this.db.object('admins/' + uid).valueChanges();
  }

  getAuthState(): Observable<firebase.User> {
    return this.afAuth.authState;
  }

  getCurrentUser(): Promise<firebase.User> {
    return this.afAuth.currentUser;
  }

  getAccessToken(): Promise<string> {
    return this.afAuth.currentUser.then((user) => {
      return user.getIdToken();
    });
  }
}
