import {inject, Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {firstValueFrom} from "rxjs";
import {Course} from "../models/course.model";
import {GetCoursesResponse} from "../models/get-courses.response";


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
