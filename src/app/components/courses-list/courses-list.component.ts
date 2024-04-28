import {Component, OnChanges, OnInit} from '@angular/core';
import {CourseService} from '../../services/course.service';
import {Location} from '@angular/common';
import {Course} from '../../models/course';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit, OnChanges {

  courses: any;
  coursesToView: any;
  statuses: [number, string][] = [[0, 'all'], ...Course.statuses()];
  form: FormGroup;

  constructor(private courseService: CourseService, private location: Location) {
    this.form = new FormGroup({
      status: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.retrieveCourses();
  }

  ngOnChanges(): void {
    this.retrieveCourses();
  }

  retrieveCourses(): void {
    this.courseService.getAll()
      .subscribe((data: Course[]) => {
        this.courses = data;
        this.coursesToView = data;
      });
  }

  deleteCourse(key: string): void {
    if (window.confirm('Are sure you want to delete this course?')) {
      this.courseService.delete(key)
        .catch(err => console.log(err));
      this.location.go('courses');
    }
  }

  filterByStatus(): void {
    if (this.form.value.status === 'all') {
      this.coursesToView = this.courses;
    } else {
      this.coursesToView = this.courses.filter(a => {
          return a.status === this.form.value.status;
        }
      );
    }
  }
}
