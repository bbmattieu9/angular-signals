import {inject, Injectable} from "@angular/core";
import {Lesson} from "@app/models/lesson.model";
import { HttpClient, HttpParams } from "@angular/common/http";
import {firstValueFrom} from "rxjs";
import {GetLessonsResponse} from "@app/models/get-lessons.response";
import {environment} from "@environments/environment";


@Injectable({
  providedIn: 'root'
})
export class LessonsService {

  env = environment;

}
