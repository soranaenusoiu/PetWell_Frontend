import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../interfaces/pet';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PetService {
  private baseURL = "http://localhost:8080";
  private backendURL = "http://localhost:8080"

  constructor(private httpClient:HttpClient) { }

  //HTTP Verbs Requests : GET, GET BY ID, POST, PUT, DELETE => through a HttpClientModule

  //HTTP GET REQUEST  -> READ
  getAllPets(): Observable<Pet[]> {
    return this.httpClient.get<Pet[]>(this.baseURL + "/pet/get");
  }

  //HTTP GET BY ID REQUEST -> READ
  getPetById(id:any):Observable<Pet>{
    return this.httpClient.get<Pet>(this.baseURL + "/pet/" + id);
  }

  putPet(): Observable<Pet>{
    const pet =  {
      id : 2,
      species:"cat", 
      breed:"common",
      name :"Mrs. Cuddles",
      age:"3",
      weight:"3.7"
    };
    
    return this.httpClient.put<Pet>(this.baseURL + "/pet/update/2", pet);
  }



}