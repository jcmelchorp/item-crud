import { CourseDbService } from './../../../classroom/services/course-db.service';
import { GoogleApiService } from './../../../auth/services/google-api.service';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { getAuthState } from './../../../auth/store/auth.selectors';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { empty, Observable, of, Subscription } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { map, switchMap, take } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from 'src/app/auth/models/user.model';
import { from } from 'rxjs/internal/observable/from';
import { Input } from '@angular/core';
import { BoardService } from 'src/app/board/services/board.service';
import { ItemService } from 'src/app/item/services/item.service';
import { Course } from 'src/app/classroom/models/course.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnDestroy {
  itemSub: Subscription;
  boardSub: Subscription;
  coursesSub: Subscription;
  courses: Course[];
  @Input() user: User;

  plus = faPlus;
  question = faQuestionCircle;

  constructor(
    public googleApiService: GoogleApiService,
    private courseService: CourseDbService,
    private store: Store<AppState>,
    private itemService: ItemService,
    private boardService: BoardService
  ) {}

  ngOnInit(): void {
    this.initCourses();
  }

  ngOnDestroy(): void {
    if (this.coursesSub) {
      this.coursesSub.unsubscribe();
    }
    if (this.itemSub) {
      this.itemSub.unsubscribe();
    }

    if (this.boardSub) {
      this.boardSub.unsubscribe();
    }
  }

  fetchCourses() {
    this.googleApiService.listCourses().then((course) => {
      console.log(course);
    });
    return this.googleApiService.courses;
  }

  initCourses(): void {
    this.coursesSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: User) => {
          if (user) {
            return this.courseService.getAll(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe((courses) => {
        if (courses.length === 0) {
          this.googleApiService.listCourses();
          this.courseService.addCourses(this.courses);
        }
      });
  }

  initItems(): void {
    this.itemSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.itemService.getAll(user.uid);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe((items) => {
        if (items.length === 0) {
          //this.itemService.addItems(this.items);
        }
      });
  }

  initBoards() {
    this.boardSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.boardService.getAll(/* user.uid */);
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe((board) => {
        if (board.length === 0) {
          //this.boardService.addCustomers(this.board);
        }
      });
  }
}
