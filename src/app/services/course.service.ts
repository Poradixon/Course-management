import {Injectable} from '@angular/core';
import {Course} from '../models/course';
import {AngularFireDatabase, AngularFireList, AngularFireObject} from '@angular/fire/database';
import {DataSnapshot} from '@angular/fire/database/interfaces';
import firebase from 'firebase/app';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CourseService {

  private collectionPath = '/courses';

  courses: AngularFireList<Course> = null;
  course: AngularFireObject<Course> = null;

  constructor(private db: AngularFireDatabase) {
    this.courses = db.list(this.collectionPath);
  }

  static getCourse(key: string): Promise<DataSnapshot> {
    return firebase.database().ref().child('courses').child(key).get();
  }

  getAll(): Observable<Course[]> {
    return this.courses.snapshotChanges()
      .pipe(map(changes => changes.map(c => {
        const data = c.payload.val();
        return new Course(
            c.payload.key,
            data.name,
            data.category,
            data.difficulty,
            new Date(data.createdAt),
            data.description,
            data.status,
            data.lessons
          );
        }
      )));
  }

  create(course: Course): any {
    return this.courses.push(course);
  }

  update(key: string, value: any): Promise<void> {
    return this.courses.update(key, value);
  }

  delete(key: string): Promise<void> {
    return this.courses.remove(key);
  }
}
