import {Component, ElementRef, inject, input, output, viewChild, viewChildren} from '@angular/core';
import {RouterLink} from "@angular/router";
import {Course} from "@app/models/course.model";
import {MatDialog} from "@angular/material/dialog";
import {openEditCourseDialog} from "@app/edit-course-dialog/edit-course-dialog.component";

@Component({
  selector: 'courses-card-list',
  imports: [
    RouterLink
  ],
  templateUrl: './courses-card-list.component.html',
  styleUrl: './courses-card-list.component.scss'
})
export class CoursesCardListComponent {

  courses = input.required<Course[]>();
  courseUpdated = output<Course>();
  courseDeleted = output<string>();
  dialog = inject(MatDialog);

  courseCards = viewChildren<ElementRef>("courseCard");

  constructor() { }

  async onEditCourse(course: Course) {
    const newCourse = await openEditCourseDialog(
      this.dialog,
      {
        mode: "update",
        title: "Update Existing Course",
        course
      }
    )
    if (!newCourse) {
      return;
    }
    console.log(`Course edited:`, newCourse);
    this.courseUpdated.emit(newCourse);
  }

  onCourseDeleted(course: Course) {
    this.courseDeleted.emit(course.id);
  }
}
