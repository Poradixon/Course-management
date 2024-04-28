import {Component, OnInit} from '@angular/core';
import {Course} from '../../models/course';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent implements OnInit {

  currentCourse: Course = null;
  statuses: [number, string][] = [...Course.statuses()];
  difficulties: [number, string][] = [...Course.difficulties()];
  form: FormGroup;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required),
      difficulty: new FormControl('', Validators.required),
      createdAt: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (!params.key) {
        return;
      }
      CourseService.getCourse(params.key).then((snapshot) => {
        if (!snapshot.exists()) {
          return;
        }
        const data = snapshot.val();
        this.currentCourse = new Course(
          params.key,
          data.name,
          data.category,
          data.difficulty,
          data.createdAt,
          data.description,
          data.status,
          data.lessons
        );
        this.form.patchValue(this.currentCourse);
      });
    });
  }
 // TODO Fix adding new course and try to add lessons funcionality
  submit(): void {
    if (this.currentCourse.key) {
      this.courseService.update(this.currentCourse.key, (this.form.value))
        .catch(err => console.log(err));
    } else {
      this.courseService.create(this.form.value);
    }
  }

  isTouchedAndValid(field: string): boolean {
    return this.form.controls[field].touched && this.form.controls[field].invalid;
  }
}
