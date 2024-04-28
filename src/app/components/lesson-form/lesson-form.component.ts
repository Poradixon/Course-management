import {Component, EventEmitter, Input, OnChanges, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';
import {Lesson} from '../../models/lesson';


@Component({
  selector: 'app-lesson-form',
  templateUrl: './lesson-form.component.html',
  styleUrls: ['./lesson-form.component.scss']
})
export class LessonFormComponent implements OnChanges {

  @Input() index: number;
  @Output() closeModal = new EventEmitter();
  currentLesson: Lesson = null;
  lessons: Lesson[] = [];
  key = '';
  form: FormGroup;

  constructor(private courseService: CourseService, private route: ActivatedRoute) {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      order: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      url: new FormControl('', Validators.required),
      estimatedDuration: new FormControl('', Validators.required),
    });
  }

  ngOnChanges(): void {
    this.route.params.subscribe(params => {
        this.key = params.key;
        if (!params.key) {
          return;
        }
        CourseService.getCourse(params.key).then((snapshot) => {
          if (!snapshot.exists()) {
            return;
          }
          const data = snapshot.val();
          if (data.lessons) {
            this.lessons = data.lessons;
            if (this.index !== undefined && this.index !== null) {
              this.currentLesson = this.lessons[this.index];
              this.form.patchValue(this.currentLesson);
            }
          }
        });
      }
    );
  }

  submit(): void {
    if (this.key
    ) {
      this.currentLesson = new Lesson(
        this.form.value.title,
        this.form.value.order,
        this.form.value.description,
        this.form.value.url,
        this.form.value.estimatedDuration);
      this.index !== undefined && this.index !== null ?
        this.lessons[this.index] = this.currentLesson :
        this.lessons.push(this.currentLesson);
      this.courseService.update(this.key, {lessons: this.lessons.sort((a, b) => a.order - b.order)})
        .catch(err => console.log(err));
    }
    this.closeModalByParent();
  }

  closeModalByParent(): void {
    this.form.reset();
    this.closeModal.emit();
  }

  deleteLesson(i: number): void {
    if (window.confirm('Are sure you want to delete this lesson?')
    ) {
      this.lessons.splice(i, 1);
      this.courseService.update(this.key, {lessons: this.lessons})
        .catch(err => console.log(err));
    }
  }

  isTouchedAndValid(field: string): boolean {
    return this.form.controls[field].touched && this.form.controls[field].invalid;
  }
}
