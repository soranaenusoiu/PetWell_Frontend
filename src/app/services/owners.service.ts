import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewOwner, Owner } from '../interfaces/owner';
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

  addOwner(ownerAdd: NewOwner): Observable<NewOwner> {
  // console.log("Add owner test 2: " + JSON.stringify(ownerAdd));
    return this.httpClient.post<NewOwner>(this.baseURL + "/owner/add", ownerAdd);
  }

  //HTTP GET REQUEST  -> READ
  getAllOwners(): Observable<Owner[]> {
    return this.httpClient.get<Owner[]>(this.baseURL + "/owner/get");
  }

  getOwnerByPhone(ownerPhone: string): Observable<Owner> {
    return this.httpClient.get<Owner>(this.baseURL + "/owner/getOwnerByPhone/" + ownerPhone);
  }
  getOwnerByName(ownerName: string): Observable<Owner>  {
    return this.httpClient.get<Owner>(this.baseURL + "/owner/getByName/" + ownerName);
  }


  // HTTP PUT REQUEST -> UPDATE
 
  updateOwner(ownerUpdate: Owner): Observable<Owner>{
    return this.httpClient.put<Owner>(this.baseURL + "/owner/update/" + ownerUpdate.id, ownerUpdate);
  }

  // HTTP DELETE REQUEST -> DELETE
 
  deleteOwner(idToDelete: number): Observable<Owner>{
    return this.httpClient.delete<Owner>(this.baseURL + "/owner/delete/" + idToDelete);
  }

}