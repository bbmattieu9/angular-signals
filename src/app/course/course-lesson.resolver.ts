import {ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Lesson} from "@app/models/lesson.model";
import {LessonsService} from "@app/services/lessons.service";
import {inject} from "@angular/core";


export const courseLessonResolver: ResolveFn<Lesson[]> =
  async (route: ActivatedRouteSnapshot,
         state: RouterStateSnapshot) => {

    const courseId = route.paramMap.get("courseId")
    if (!courseId) {
      return [];
    }

    const lessonSrv = inject(LessonsService);
    return lessonSrv.loadLessons({courseId});
  }
