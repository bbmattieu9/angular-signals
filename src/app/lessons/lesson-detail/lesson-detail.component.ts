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

  lessonSrv = inject(LessonsService);
  messagesSrv = inject(MessagesService);
  cancel = output();
  lesson = input.required<Lesson | null>();
  lessonUpdated = output<Lesson>();


  onCancel() {
    this.cancel.emit();
  }

  async onSave(description: string) {
    try {
      const lesson = this.lesson();
      const updatedLesson = await this.lessonSrv.saveLesson(lesson!.id, {description});
      this.lessonUpdated.emit(updatedLesson);
    } catch (err) {
      console.error(err);
      this.messagesSrv.showMessage(`Error saving lesson`, 'error');
    }
  }

}
