import {Component, ElementRef, inject, signal, viewChild} from '@angular/core';
import {LessonsService} from "@app/services/lessons.service";
import {Lesson} from "@app/models/lesson.model";
import {LessonDetailComponent} from "./lesson-detail/lesson-detail.component";

@Component({
    selector: 'lessons',
    imports: [
        LessonDetailComponent
    ],
    templateUrl: './lessons.component.html',
    styleUrl: './lessons.component.scss'
})
export class LessonsComponent {




}
