import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseToolbarComponent } from './course-toolbar.component';

describe('CourseToolbarComponent', () => {
  let component: CourseToolbarComponent;
  let fixture: ComponentFixture<CourseToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
