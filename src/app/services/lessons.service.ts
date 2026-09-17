import {inject, Injectable} from "@angular/core";
import {Lesson} from "@app/models/lesson.model";
import {HttpClient, HttpParams} from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {GetLessonsResponse} from "@app/models/get-lessons.response";
import {environment} from "@environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  env = environment;
  httpMessenger = inject(HttpClient);

  async loadLessons(config: {
    courseId?: string,
    query?: string
  }): Promise<Lesson[]> {
    const {courseId, query} = config;
    let params = new HttpParams();
    if (courseId) {
      params = params.set("courseId", courseId);
    }
    if (query) {
      params = params.set("query", query);
    }
    const lessons$ = this.httpMessenger.get<GetLessonsResponse>(
      `${this.env.apiRoot}/search-lessons`, {params}
    )
    const response = await firstValueFrom(lessons$);
    return response.lessons;
  }

  async saveLesson(lessonId: string, changes: Partial<Lesson>): Promise<Lesson> {
    const saveLesson$ = this.httpMessenger.put<Lesson>(`${this.env.apiRoot}/lessons/${lessonId}`, changes);
    return firstValueFrom(saveLesson$);
  }

}
