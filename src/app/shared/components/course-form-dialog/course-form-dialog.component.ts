import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-course-form-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
  ],
  templateUrl: './course-form-dialog.component.html',
  styleUrl: './course-form-dialog.component.scss',
})
export class CourseFormDialogComponent implements OnInit {
  isEdit = false;
  form: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CourseFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      courseName: [
        this.data?.courseName || '',
        [Validators.required, Validators.minLength(3)],
      ],
      instructorName: [this.data?.instructorName || '', Validators.required],
      category: [this.data?.category || '', Validators.required],
      duration: [
        this.data?.duration || null,
        [Validators.required, Validators.min(1)],
      ],
      price: [
        this.data?.price || null,
        [Validators.required, Validators.min(0)],
      ],
      status: [this.data?.status || '', Validators.required],
      createdDate:[this.data?.createdDate || '', Validators.required],
      description: [this.data?.description || '', [Validators.maxLength(500)]],
    });
    this.isEdit = !!this.data;

  }

  submit() {
    if (this.form.invalid) return;

    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
