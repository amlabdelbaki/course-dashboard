import { Injectable } from '@angular/core';
import { environment } from './../../../../environments/environment';
import { HttpClient ,HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ManageCoursesService {

    private baseUrl = `${environment.apiUrl}/courses`;

  constructor(private http: HttpClient) {}

  getCourses(page: number = 1, limit: number = 5, search?: string, status?: string) {
    let params = new HttpParams()
      .set('_page', page)
      .set('_limit', limit);

    if (search) {
      params = params.set('courseName_like', search);
    }

    if (status) {
      params = params.set('status', status);
    }

    return this.http.get(this.baseUrl, { params, observe: 'response' });
  }

  getCourseById(id: number) {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  addCourse(course: any) {
    return this.http.post(this.baseUrl, course);
  }

  updateCourse(id: number, course: any) {
    return this.http.put(`${this.baseUrl}/${id}`, course);
  }

  deleteCourse(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
