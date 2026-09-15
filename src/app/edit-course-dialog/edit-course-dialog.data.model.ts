import {Course} from "@app/models/course.model";


export type EditCourseDialogData = {
  mode: 'create' | 'update';
  title: string;
  course?: Course;
}
