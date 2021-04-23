import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AppServiceService {

  constructor(private http: HttpClient) { }

  getData(url: any) {
    return this.http.get(url);
  }

  PostData(url: any, param: any) {
    return this.http.post(url, param);
  }

  editData(url: any, id: any, param: any) {
    return this.http.put(`${url}/${id}`, param);
  }

  deleteData(url: any, id: any) {
    return this.http.delete(`${url}/${id}`);
  }
}
