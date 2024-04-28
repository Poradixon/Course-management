import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Course} from '../../models/course';
import {CourseService} from '../../services/course.service';
import {ActivatedRoute} from '@angular/router';
import {CoursesListComponent} from '../courses-list/courses-list.component';
import {LessonFormComponent} from '../lesson-form/lesson-form.component';
import {Lesson} from '../../models/lesson';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
})
export class CourseDetailsComponent implements OnInit {

  @ViewChild('modal') modal: ElementRef;
  @ViewChild(LessonFormComponent) child: LessonFormComponent;

  currentCourse: Course;
  lessons: Lesson[];
  key = '';
  lessonId: number | null;

  constructor(private courseService: CourseService, private route: ActivatedRoute,
              private courseList: CoursesListComponent) {
  }

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    this.route.params.subscribe(params => this.key = params.key);
    CourseService.getCourse(this.key).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        this.lessons = data.lessons;
        this.currentCourse = new Course(
          this.key,
          data.name,
          data.category,
          data.difficulty,
          data.createdAt,
          data.description,
          data.status,
          data.lessons);
      }
    });
  }

  openModal(): void {
    this.modal.nativeElement.style.display = 'block';
  }

  closeModal(): void {
    this.modal.nativeElement.style.display = 'none';
    this.getCourse();
  }

  search($event: string): void {
    const regexp = new RegExp($event, 'i');
    this.lessons = this.currentCourse.lessons.filter(
      (lesson) => lesson.description.match(regexp)
    );
  }
}
