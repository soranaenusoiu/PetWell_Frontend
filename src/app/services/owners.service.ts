import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Owner } from '../interfaces/owner';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class OwnersService {
  private baseURL = "http://localhost:8080";
  private backendURL = "http://localhost:8080"

  constructor(private httpClient:HttpClient) { }

  //HTTP Verbs Requests : GET, GET BY ID, POST, PUT, DELETE => through a HttpClientModule

// HTTP POST REQUEST -> CREATE
// addOwner(): Observable<Owner> {
//   let ownerToAdd =  {
//     name :"Mihai Barbarasa",
//     phone : "0712345777",
//     email : "mihaibarbarasa@gmail.com",
//     address : "Calea Victoriei, nr.14"
//   };
//   return this.httpClient.post<Owner>(this.baseURL + "/owner/add", ownerToAdd);
// }

  //HTTP GET REQUEST  -> READ
  getAllOwners(): Observable<Owner[]> {
    return this.httpClient.get<Owner[]>(this.baseURL + "/owner/get");
  }

  // //HTTP GET BY ID REQUEST -> READ
  // getOwnerById(id:any):Observable<Owner>{
  //   return this.httpClient.get<Owner>(this.baseURL + "/owner/" + id);
  // }

  // HTTP GET BY PHONE REQUEST -> READ
  getOwnerByPhone(): Observable<Owner> {
    let phone : string = "0712345678";
    return this.httpClient.get<Owner>(this.backendURL + "/owner/getOwnerByPhone/" + phone)
  }

  // HTTP PUT REQUEST -> UPDATE
  putOwner(): Observable<Owner>{
    let owner =  {
      id : 1,
      name :"Matei Barbarasa",
      phone : "0712345678",
      email : "arhimateibarbarasa@gmail.com",
      address : "Calea Victoriei, nr.14"
    };
    
    return this.httpClient.put<Owner>(this.baseURL + "/owner/update/1", owner);
  }

  // HTTP DELETE REQUEST -> DELETE
  deleteOwner(): Observable<Owner> {
    let ownerToDelete : number = 2;
    return this.httpClient.delete<Owner>(this.backendURL + "/owner/delete/" + ownerToDelete);
  }

}