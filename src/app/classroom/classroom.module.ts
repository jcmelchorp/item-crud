import { CourseEffect } from './store/course.effects';
import { CoursesComponent } from './components/courses/courses.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassroomRoutingModule } from './classroom-routing.module';
import { ClassroomShellComponent } from './containers/classroom-shell/classroom-shell.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromCourse from './store/course.reducer';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { CourseComponent } from './components/course/course.component';

@NgModule({
  declarations: [ClassroomShellComponent, CoursesComponent, CoursesListComponent, CourseComponent],
  imports: [
    CommonModule,
    ClassroomRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    FontAwesomeModule,
    StoreModule.forFeature('course', fromCourse.courseReducer),
    EffectsModule.forFeature([CourseEffect]),
  ],
  exports: [CoursesComponent],
  providers: [],
})
export class ClassroomModule {}
