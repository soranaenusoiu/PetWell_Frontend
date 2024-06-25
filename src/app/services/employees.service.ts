import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from '../interfaces/employee';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private baseURL = "http://localhost:3000";
  private backendURL = "http://localhost:8080/hello"

  constructor(private httpClient:HttpClient) { }

  //HTTP Verbs Requests : GET, GET BY ID, POST, PUT, DELETE => through a HttpClientModule

  //HTTP GET REQUEST  -> READ
  getAllEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(this.baseURL + "/employees");
  }

  //HTTP GET BY ID REQUEST -> READ
  getEmployeeById(id:any):Observable<Employee>{
    return this.httpClient.get<Employee>(this.baseURL + "/employees/" + id);
  }

  
}
