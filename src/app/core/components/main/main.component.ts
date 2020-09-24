import { getUser } from 'src/app/auth/store/auth.selectors';
import { getAuthState } from './../../../auth/store/auth.selectors';
import { Component, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  plus = faPlus;
  question = faQuestionCircle;

  user$: Observable<User | null>;
  isLoading$: Observable<boolean>;

  constructor(
    private afAuth: AngularFireAuth,
    private store: Store<AppState>
  ) {}

  get user(): Promise<firebase.User | null> {
    return this.afAuth.currentUser;
  }

  ngOnInit(): void {
    /*     this.isLoading$ = this.store.select(getAllLoaded);
     */
  }
}
