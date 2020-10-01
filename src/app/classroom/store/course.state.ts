import { Course } from '../models/course.model';

export interface CourseState {
  course: Course[] | null;
  loading: boolean;
  error: string;
}

export const courseInitialState: CourseState = {
  course: null,
  loading: false,
  error: null,
};
