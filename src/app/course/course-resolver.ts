import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {CoursesService} from "@app/services/courses.service";
import {inject} from "@angular/core";


export const courseResolver: ResolveFn<any> =
  async (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

    const courseId = route.paramMap.get('courseId');
    if (!courseId) {
      return null;
    }
    const courseSrv = inject(CoursesService);
    return courseSrv.getCourseById(courseId);
}
