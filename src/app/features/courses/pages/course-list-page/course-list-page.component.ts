import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageEvent } from '@angular/material/paginator';
import { Subject, switchMap,tap } from 'rxjs';
import { Course } from '../../models/course.interface';
import { ManageCoursesService } from './../../services/manage-courses.service';
import { CourseToolbarComponent } from './../../components/course-toolbar/course-toolbar.component';
import { CourseTableComponent } from './../../components/course-table/course-table.component';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-course-list-page',
  standalone: true,
  imports: [CommonModule,MatButtonModule, CourseToolbarComponent, CourseTableComponent,MatProgressSpinnerModule],

templateUrl: './course-list-page.component.html',
  styleUrl: './course-list-page.component.scss',
})
export class CourseListPageComponent implements OnInit {
  private readonly coursesService = inject(ManageCoursesService);
  private readonly snackBar = inject(MatSnackBar);
  private readonly destroyRef = inject(DestroyRef);
  private readonly filterChanges$ = new Subject<void>();
  loading = signal(true);
  courses = signal<Course[]>([]);
  totalCount = 0;
  page = 1;
  limit = 10;
  searchTerm = '';
  statusFilter = 'all';

  ngOnInit(): void {
   this.getTotalCoursesCount();
    this.filterChanges$
      .pipe(
        tap(() => this.loading.set(true)), // ✅ start loading BEFORE request
        switchMap(() => this.fetchCourses()),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: (response) => {
          this.courses.set(response.body as Course[]);
          // this.totalCount = Number(response.headers.get('X-Total-Count') ?? 0);
          this.loading.set(false); // ✅ stop loading
        },
        error: () => {
          this.loading.set(false); // ✅ also stop on error
        }
      });

    this.filterChanges$.next();
  }

  private fetchCourses() {
    const search = this.searchTerm.length >= 2 ? this.searchTerm : undefined;
    const status = this.statusFilter !== 'all' ? this.formatStatus(this.statusFilter) : undefined;
    return this.coursesService.getCourses(this.page, this.limit, search, status);
  }

  getTotalCoursesCount(){
      this.coursesService.getTotalCourses().subscribe(res => {
       this.totalCount = res.length;
  });
  }

  loadCourses(): void {
    this.loading.set(true);
    this.fetchCourses().subscribe((response) => {
      this.courses.set(response.body as Course[]);
      this.loading.set(false);
      // this.totalCount = Number(response.headers.get('X-Total-Count') ?? 0);
    });
  }

  onSearchChange(term: string): void {
    if (term.length < 2) {
      if (!this.searchTerm) return;

      this.searchTerm = '';
      this.page = 1;
      this.filterChanges$.next();
      return;
    }

    this.searchTerm = term;
    this.page = 1;
    this.filterChanges$.next();
  }

  onStatusChange(status: string): void {
    this.statusFilter = status;
    this.page = 1;
    this.filterChanges$.next();
  }

  onPageChange(event: PageEvent): void {
    this.limit = event.pageSize;
    this.page = event.pageIndex + 1;
    this.loadCourses();
  }

  deleteCourse(course: Course): void {
    this.coursesService.deleteCourse(course.id).subscribe(() => {
      this.snackBar.open('Course deleted successfully ', 'close', { duration: 4000 });
      this.loadCourses();
    });
  }

  createCourse(course: Course): void {
    this.coursesService.addCourse(course).subscribe(() => {
      this.snackBar.open('Course added successfully ', 'close', { duration: 3000 });
      this.loadCourses();
    });
  }

  editCourse(course: Course): void {
    this.coursesService.updateCourse(course.id, course).subscribe(() => {
      this.snackBar.open('Course updated successfully ', 'close', { duration: 3000 });
      this.loadCourses();
    });
  }

  private formatStatus(status: string): string {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  }
}
