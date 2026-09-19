import {Component, computed, effect, inject, Injector, OnInit, signal} from '@angular/core';
import {CoursesService} from "@app/services/courses.service";
import {Course, sortCoursesBySeqNo} from "@app/models/course.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {CoursesCardListComponent} from "@app/courses-card-list/courses-card-list.component";
import {MatDialog} from "@angular/material/dialog";
import {MessagesService} from "@app/messages/messages.service";
import {catchError, from, interval, of, startWith, throwError} from "rxjs";
import {toObservable, toSignal, outputToObservable, outputFromObservable} from "@angular/core/rxjs-interop";
import {CoursesServiceWithFetch} from "@app/services/courses-fetch.service";
import {openEditCourseDialog} from "@app/edit-course-dialog/edit-course-dialog.component";
import {LoadingService} from "@app/loading/loading.service";


type Counter = {
  value: number;
}

@Component({
  selector: 'home',
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  loadingSrv = inject(LoadingService);
  dialog = inject(MatDialog);
  messagesSrv = inject(MessagesService);
  coursesService = inject(CoursesService);

  #courses = signal<Course[]>([]);
  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category === "BEGINNER")
  });

  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter((course) => course.category === "ADVANCED")
  });


  ngOnInit(): void {
  }

  constructor() {

    this.loadCourses()
      .then(() => console.log(`All courses have been loaded`, this.#courses()));

    effect(() => {
      console.log(`Beginner courses: `, this.beginnerCourses());
      console.log(`Advanced courses: `, this.advancedCourses());
    });
  }

  async loadCourses() {
    try {

      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (err) {
      this.messagesSrv.showMessage(
        "Error loading courses.",
        "error"
      )
    }
  }

  onCourseUpdated(updatedCourse: Course) {

    if (!updatedCourse) {
      return;
    }
    const courses = this.#courses();
    const newCourses = courses.map(course => (
      course.id === updatedCourse.id ? updatedCourse : course
    ));
    this.#courses.set(newCourses);
  }

  async onCourseDeleted(courseId: string) {
    try {
      await this.coursesService.deleteCourse(courseId);
      const courses = this.#courses();
      const newCourses = courses.filter((course) => course.id !== courseId);
      this.#courses.set(newCourses);
    } catch (error) {
      console.error(error);
      alert(`Error deleting course: ${error}`);
    }
  }

  async onAddCourse() {
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: "create",
        title: "Create New Course",
      }
    )
    if (!newCourse) {
      return;
    }
    const newCourses = [
      ...this.#courses(),
      newCourse
    ];
    this.#courses.set(newCourses);
  }

  injector = inject(Injector);

  onToObservableExample() {
    const numbers = signal(0);
    const numbers$ = toObservable(numbers, {
      injector: this.injector
    });
    numbers$.subscribe((value) => {
      console.log(`numbers$ emit: ${value}`);
    });
  }


  onToSignalExample1() {
    const coursesObs$ = from(this.coursesService.loadAllCourses()).pipe(
      catchError(error => {
        console.log(`Error caught in catchError():`, error)
        throw error;
      })
    );
    const courses = toSignal(coursesObs$, {
      injector: this.injector
    });
    effect(() => {
      console.log(` Courses: `, courses());
    }, {
      injector: this.injector
    });
  }

  onToSignalExample() {
    try {
      const coursesObs$ = from(this.coursesService.loadAllCourses()).pipe(
        catchError(error => {
          console.log(`Error caught in catchError():`, error)
          throw error;
        })
      );
      const courses = toSignal(coursesObs$, {
        injector: this.injector,
        rejectErrors: true
      });
      effect(() => {
        console.log(` Courses: `, courses());
      }, {
        injector: this.injector
      });
    } catch (error) {
      console.log(`Error caught in catch block:`, error)
    }
  }

  onToSignalExample2() {
    const number$ = interval(1000).pipe(startWith(0));
    const numbers = toSignal(number$, {
      injector: this.injector,
      // requireSync: true
    });
    effect(() => {
      console.log(`Numbers`, numbers());
    }, {
      injector: this.injector
    });
  }
}
