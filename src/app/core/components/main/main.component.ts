import { GoogleApiService } from './../../../auth/services/google-api.service';
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
import { from } from 'rxjs/internal/observable/from';
import { Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  plus = faPlus;
  question = faQuestionCircle;
  @Input() user: User;

  constructor(
    public googleApiService: GoogleApiService,
    private afAuth: AngularFireAuth,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    //this.googleApiService.getCalendar();
  }
}
