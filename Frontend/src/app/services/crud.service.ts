import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  constructor(private http: HttpClient) { }

  getStudents() {
    return this.http.get("http://localhost:8085/api/student/");
  }

  addStudent(student: any) {
    return this.http.post("http://localhost:8085/api/student/add/", student);
  }

  updateStudent(student: any, id: any) {
    return this.http.put(`http://localhost:8085/api/student/update/${id}`, student);
  }

  deleteStudent(student: any) {
    return this.http.delete(`http://localhost:8085/api/student/delete/${student.id}`);
  }
}
