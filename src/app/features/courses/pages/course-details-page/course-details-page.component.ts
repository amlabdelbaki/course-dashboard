import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ManageCoursesService } from './../../services/manage-courses.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
@Component({
  selector: 'app-course-details-page',
  standalone: true,
  imports: [CommonModule,RouterModule,  MatButtonModule,MatProgressSpinnerModule],



templateUrl: './course-details-page.component.html',
  styleUrl: './course-details-page.component.scss'
})
export class CourseDetailsPageComponent {
 course: any;

  constructor(
    private route: ActivatedRoute,
    private courseService: ManageCoursesService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.courseService.getCourseById(id).subscribe(res => {
        this.course = res;
      });
    }
  }
}
