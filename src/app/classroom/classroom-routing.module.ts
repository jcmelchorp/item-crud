import { CoursesComponent } from './components/courses/courses.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClassroomShellComponent } from './containers/classroom-shell/classroom-shell.component';

const routes: Routes = [
  {
    path: '',
    component: ClassroomShellComponent,
    children: [{ path: '', component: CoursesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomRoutingModule {}
