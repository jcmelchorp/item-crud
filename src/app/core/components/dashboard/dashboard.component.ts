import { CourseDbService } from './../../../classroom/services/course-db.service';
import { BoardService } from './../../../board/services/board.service';
import { ItemService } from './../../../item/services/item.service';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription, empty } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { switchMap, take } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { getUser } from 'src/app/auth/store/auth.selectors';
import { Item } from 'src/app/item/models/item.model';
import { Board } from 'src/app/board/models/board.model';
import { GoogleApiService } from 'src/app/auth/services/google-api.service';
import { Course } from 'src/app/classroom/models/course.model';
import { User } from 'src/app/auth/models/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  @Input() user: User;
  itemSub: Subscription;
  boardSub: Subscription;
  coursesSub: Subscription;
  courses: Course[];

  constructor(
    private courseService: CourseDbService,
    private store: Store<AppState>,
    private itemService: ItemService,
    private boardService: BoardService,
    public googleApiService: GoogleApiService
  ) {}

  ngOnInit(): void {
    //this.initCourses();
    /* this.initItems();
    this.initBoards(); */
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

  /* fetchCourses() {
    this.googleApiService.listCourses().then((course) => {
      console.log(course);
    });
    return this.googleApiService.courses;
  } */

  /*   initCourses(): void {
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
          this.courseService.addCourses(this.googleApiService.listCourses());
        }
      });
  } */

  /*  initItems() {
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
  } */

  /* initBoards() {
    this.boardSub = this.store
      .pipe(
        select(getUser),
        switchMap((user: any) => {
          if (user) {
            return this.boardService.getAll( user.uid );
          } else {
            return empty();
          }
        }),
        take(1)
      )
      .subscribe((board) => {
        if (board.length === 0) {
          this.boardService.addCustomers(this.board);
        }
      });
  }  */
}
