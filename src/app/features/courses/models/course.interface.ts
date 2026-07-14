export type CourseStatus = "active" | "draft" | "archived";
export interface Course {
      id: string,
      courseName: string,
      instructorName: string,
      category: string,
      duration: number,
      price: number,
      status: CourseStatus,
      createdDate: string
}