import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { CourseFormDialogComponent } from '../../../../shared/components/course-form-dialog/course-form-dialog.component';
import { Course } from '../../models/course.interface';

@Component({
  selector: 'app-course-toolbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './course-toolbar.component.html',
  styleUrl: './course-toolbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseToolbarComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly destroyRef = inject(DestroyRef);

  @Output() onCourseAdd = new EventEmitter<Course>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() statusChange = new EventEmitter<string>();

  selectedStatus = 'all';
  searchControl = new FormControl('', { nonNullable: true });

  ngOnInit(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(400),
        map((value) => value.trim()),
        distinctUntilChanged(),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((term) => this.searchChange.emit(term));
  }

  onStatusChange(status: string): void {
    this.statusChange.emit(status);
  }

  openAddCourse(): void {
    this.dialog
      .open(CourseFormDialogComponent, {
        width: '500px',
        panelClass: 'light-dialog',
        data: null,
      })
      .afterClosed()
      .subscribe((result) => {
        if (!result) return;
        this.onCourseAdd.emit(result);
      });
  }
}
