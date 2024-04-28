import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CoursesListComponent} from './components/courses-list/courses-list.component';
import {CourseFormComponent} from './components/course-form/course-form.component';
import {CourseDetailsComponent} from './components/course-details/course-details.component';

const routes: Routes = [
  {path: '', redirectTo: 'courses', pathMatch: 'full'},
  {path: 'courses', component: CoursesListComponent},
  {path: 'add', component: CourseFormComponent},
  {path: 'update/:key', component: CourseFormComponent},
  {path: 'details/:key', component: CourseDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
