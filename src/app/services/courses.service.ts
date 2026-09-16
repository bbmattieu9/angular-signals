import {inject, Injectable} from "@angular/core";
import {HttpClient, HttpContext} from "@angular/common/http";
import {environment} from "@environments/environment";
import {firstValueFrom} from "rxjs";
import {Course} from "@app/models/course.model";
import {GetCoursesResponse} from "@app/models/get-courses.response";
import {MessagesService} from "@app/messages/messages.service";


@Injectable({
  providedIn: "root"
})
export class CoursesService {

  env = environment;

  httpMessenger = inject(HttpClient);

  async loadAllCourses(): Promise<Course[]> {
    const courses$ =
      this.httpMessenger.get<GetCoursesResponse>(`${this.env.apiRoot}/courses`);
    const response = await firstValueFrom(courses$);
    return response.courses;
  }

  async getCourseById(courseId: string): Promise<Course> {
    const course$ = this.httpMessenger.get<Course>(
      `${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(course$);
  }

  async createCourse(course: Partial<Course>): Promise<Course> {
    const course$ = this.httpMessenger.post<Course>(`${this.env.apiRoot}/courses`, course);
    return firstValueFrom(course$);
  }

  async saveCourse(courseId: string, changes: Partial<Course>): Promise<Course> {
    const course$ = this.httpMessenger.put<Course>(`${this.env.apiRoot}/courses/${courseId}`, changes);
    return firstValueFrom(course$);
  }

  async deleteCourse(courseId: string) {
    const delete$ = this.httpMessenger.delete(`${this.env.apiRoot}/courses/${courseId}`);
    return firstValueFrom(delete$);
  }


}
