import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {CoursesListComponent} from './components/courses-list/courses-list.component';
import {CourseDetailsComponent} from './components/course-details/course-details.component';
import {LessonDetailsComponent} from './components/lesson-details/lesson-details.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {CourseFormComponent} from './components/course-form/course-form.component';
import {LessonFormComponent} from './components/lesson-form/lesson-form.component';
import { DurationPipe } from './pipes/duration.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CoursesListComponent,
    CourseDetailsComponent,
    LessonDetailsComponent,
    CourseFormComponent,
    LessonFormComponent,
    DurationPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    ReactiveFormsModule,
  ],
  providers: [CoursesListComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
