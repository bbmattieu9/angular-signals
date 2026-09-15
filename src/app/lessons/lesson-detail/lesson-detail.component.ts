import {Component, inject, input, output} from '@angular/core';
import {Lesson} from "@app/models/lesson.model";
import {ReactiveFormsModule} from "@angular/forms";
import {LessonsService} from "@app/services/lessons.service";
import {MessagesService} from "@app/messages/messages.service";

@Component({
    selector: 'lesson-detail',
    imports: [
        ReactiveFormsModule
    ],
    templateUrl: './lesson-detail.component.html',
    styleUrl: './lesson-detail.component.scss'
})
export class LessonDetailComponent {



}
