import { CurrencyPipe, DatePipe } from '@angular/common';
import {
  Component,
  Input,
  Signal,
  Output,
  EventEmitter,
  effect,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Course } from '../../models/course.interface';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationMessageComponent } from '../../../../shared/components/confirmation-message/confirmation-message.component';
import { CourseFormDialogComponent } from '../../../../shared/components/course-form-dialog/course-form-dialog.component';
  import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-course-table',
  standalone: true,
  imports: [
  MatTableModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    DatePipe,
    MatPaginatorModule,
    RouterModule
  ],
  templateUrl: './course-table.component.html',
  styleUrl: './course-table.component.scss',
})
export class CourseTableComponent {
  dataSource = new MatTableDataSource<Course>();

  @Input() courses!: Signal<Course[]>;
  @Input() totalCount = 0;
  @Input() pageIndex = 0;
  @Input() pageSize = 10;
  @Output() pageChange = new EventEmitter<PageEvent>();
  @Output() onCourseDelete = new EventEmitter<Course>();
  @Output() onCourseEdit = new EventEmitter<Course>();
  displayedColumns: string[] = [
    'id',
    'courseName',
    'instructorName',
    'category',
    'duration',
    'price',
    'status',
    'createdDate',
    'actions',
  ];

  constructor(private dialog: MatDialog) {
    effect(() => {
      this.dataSource.data = this.courses() || [];
    });
  }

  trackById(_index: number, course: Course): number {
    return course.id;
  }

  editCourse(course: Course) {
    const id = course.id;
    this.dialog
      .open(CourseFormDialogComponent, {
        width: '500px',
        panelClass: 'light-dialog',
        data: course,
      })
      .afterClosed()
      .subscribe((result) => {
        if (!result) return;
        if (result) {
          result.id = id;
          this.onCourseEdit.emit(result);
        }
      });
  }

  deleteCourse(course: Course): void {
    console.log('delete', course);

    const dialogRef = this.dialog.open(ConfirmationMessageComponent, {
      width: '400px',
      panelClass: 'light-dialog',
      data: {
        message: `Are you sure you want to delete ${course.courseName} course?`,
        title: 'Delete Course',
        confirmText: 'Delete',
        cancelText: 'Keep',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.onCourseDelete.emit(course);
      }
    });
  }



  onPageChange(event: PageEvent): void {
    this.pageChange.emit(event);
  }
}
