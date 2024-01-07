import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {

  constructor(private httpclient:HttpClient) { }

  public addEmployee(data: any){
    return this.httpclient.post('http://localhost:3000/emplyee', data);
  }

  getEmployeeList() {
    return this.httpclient.get('http://localhost:3000/emplyee');
  }
}
