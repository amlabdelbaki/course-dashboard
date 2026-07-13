import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./features/courses/pages/course-list-page/course-list-page.component').then((m) => m.CourseListPageComponent),
  },

  {
  path: 'courses/:id',
 loadComponent: () =>
     import('./features/courses/pages/course-details-page/course-details-page.component').then((m) => m.CourseDetailsPageComponent),
}
//   {
//     path: 'programs',
//     loadComponent: () =>
//       import('./features/tasks/tasks-page.component').then((m) => m.TasksPageComponent),
//   },
//   {
//     path: 'subscriptions',
//     loadComponent: () =>
//       import('./features/calendar/calendar-page.component').then((m) => m.CalendarPageComponent),
//   },
//   {
//     path: 'gradebook',
//     loadComponent: () =>
//       import('./features/analytics/analytics-page.component').then((m) => m.AnalyticsPageComponent),
//   },

//   {
//     path: 'settings',
//     loadComponent: () =>
//       import('./features/settings/settings-page.component').then((m) => m.SettingsPageComponent),
//   }

 , { path: '**', redirectTo: '' },
];

