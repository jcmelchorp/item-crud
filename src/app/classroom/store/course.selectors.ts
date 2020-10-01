import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CourseState } from './course.state';
// import { AppState } from '../../reducers/index';

export const getCourseState = createFeatureSelector<CourseState>('course');

export const getCourse = createSelector(
  getCourseState,
  (course) => course.course
);

export const getAllLoaded = createSelector(
  getCourseState,
  (course) => course.loading
);

export const getError = createSelector(
  getCourseState,
  (course) => course.error
);
