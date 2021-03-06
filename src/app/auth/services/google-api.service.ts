import { Course } from './../../classroom/models/course.model';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { from, Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
declare var gapi;
@Injectable({
  providedIn: 'root',
})
export class GoogleApiService {
  user$: Observable<firebase.User>;
  courses: Course[];
  calendarItems: any[];
  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.user$ = afAuth.authState;
      }
    });
    this.initClient();
  }

  initClient() {
    gapi.load('client', () => {
      console.log('loaded client');
      gapi.client.init({
        apiKey: environment.firebaseConfig.apiKey,
        clientId: environment.firebaseConfig.clientId,
        discoveryDocs: environment.firebaseConfig.discoveryDocs,
        scope: environment.firebaseConfig.scope,
      });
      gapi.client.load('classroom', 'v1', () => console.log('loaded courses'));
    });
  }

  async login() {
    const googleAuth = gapi.auth2.getAuthInstance();
    const googleUser = await googleAuth.signIn();
    const token = googleUser.getAuthResponse().id_token;
    const credential = auth.GoogleAuthProvider.credential(token);
    await this.afAuth.signInWithCredential(credential);
  }

  logout(): void {
    this.afAuth.signOut();
  }

  /**
   * Lists all course names and ids.
   */
  listCourses(): Course[] {
    let courseList: Course[];
    courseList = gapi.client.classroom.courses
      .list({
        pageSize: 10,
      })
      .then((response) => {
        return response.result.courses;
      });
    return courseList;
  }

  /* async listCourses() {
    const courses = gapi.client.classroom.courses.list();
    if (courses.length === 0) {
      console.log('No courses found.');
    } else {
      this.courses = courses.result.courses;

      const courseData = courses.result.courses.map((course: Course) => {
        const ownerName = gapi.client.classroom.courses.teachers.get(
          course.id,
          course.ownerId
        ).profile.name.fullName;
        const data = `${course.name} : ${course.id} : ${ownerName}`;
        console.log(data);
        return data;
      });
      return courseData;
    }
  } */
  /* listCourses(callback, dispatch) {
    gapi.client.classroom.courses
      .list({ teacherId: gapi.auth2.getAuthInstance().currentUser.get()['El'] })
      .then((response) => {
        dispatch(callback(response.result.courses));
      });
  }
 */
  async getCalendar() {
    const events = await gapi.client.calendar.events.list({
      calendarId: 'primary',
      timeMin: new Date().toISOString(),
      showDeleted: false,
      singleEvents: true,
      maxResults: 10,
      orderBy: 'startTime',
    });
    console.log(events);
    this.calendarItems = events.result.items;
  }

  async insertEvent() {
    const insert = await gapi.client.calendar.events.insert({
      calendarId: 'primary',
      start: {
        dateTime: hoursFromNow(2),
        timeZone: 'America/Mexico_City',
      },
      end: {
        dateTime: hoursFromNow(3),
        timeZone: 'America/Mexico_City',
      },
      summary: 'Have Fun!',
      description: 'This is a test from an Angular WebApp',
    });
    await this.getCalendar();
  }
}
const hoursFromNow = (n) =>
  new Date(Date.now() + n * 1000 * 60 * 60).toISOString();
