import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../interfaces/owner';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  private baseURL = "http://localhost:3000";
  private backendURL = "http://localhost:8080/hello"

  constructor(private httpClient:HttpClient) { }

  //HTTP Verbs Requests : GET, GET BY ID, POST, PUT, DELETE => through a HttpClientModule

  //HTTP GET REQUEST  -> READ
  getAllOwners(): Observable<Owner[]> {
    return this.httpClient.get<Owner[]>(this.baseURL + "/owners");
  }

  //HTTP GET BY ID REQUEST -> READ
  getOwnerById(id:any):Observable<Owner>{
    return this.httpClient.get<Owner>(this.baseURL + "/owners/" + id);
  }


}