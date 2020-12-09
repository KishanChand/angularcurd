import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CurdserviceService {

  constructor(private http:HttpClient) { }

  getData() {
    return this.http.get(`${environment.apiUrl}/userDetail`);
  }

  addData(data) {
    return this.http.post(`${environment.apiUrl}/userDetail`, data);
  }

  readData(id) {
    return this.http.get(`${environment.apiUrl}/userDetail/${id}`);
  }

  updateData(id, data) {
    return this.http.put(`${environment.apiUrl}/userDetail/${id}`, data);
  }

  deleteData(id) {
    return this.http.delete(`${environment.apiUrl}/userDetail/${id}`);
  }

}
