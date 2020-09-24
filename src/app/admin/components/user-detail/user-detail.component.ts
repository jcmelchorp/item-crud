import { Component, OnInit, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { User } from '../../../auth/models/user.model';
/* import { Course } from 'src/app/courses/models/course.model';
 */
@Component({
  selector: 'app-userdetail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {
  @Input() user: User | undefined;
  /* @Input() courses: Course[];
  @Input() userCoursesLoading: boolean; */
  @Output() detailsClosed = new EventEmitter<any>();
  @Output() coursesLoad = new EventEmitter<any>();
/*   @Output() courseDeleted = new EventEmitter<Course>();
 */  @Output() addAdmin = new EventEmitter<any>();
  @Output() removeAdmin = new EventEmitter<any>();
  left = faArrowLeft;
  circ = faCircle;

  constructor() { }

  ngOnInit(): void {
  }
  closeDetails(): void {
    this.detailsClosed.emit();
  }

  loadCourses(): void {
    this.coursesLoad.emit();
  }

  /* onCourseDelete(course: Course) {
    this.courseDeleted.emit(course);
  } */

  onAddAdmin(): void {
    this.addAdmin.emit(this.user);
  }

  onRemoveAdmin(): void {
    this.removeAdmin.emit(this.user);
  }
}
