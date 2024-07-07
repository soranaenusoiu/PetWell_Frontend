import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pet } from '../interfaces/pet';
import { HttpClient, HttpParams } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PetService {
  private baseURL = "http://localhost:8080";
  private backendURL = "http://localhost:8080"

  constructor(private httpClient: HttpClient) { }

  //HTTP Verbs Requests : GET, GET BY ID, POST, PUT, DELETE => through a HttpClientModule


  // HTTP POST REQUEST -> CREATE
  addPet(petToAdd:Pet): Observable<Pet> {
    console.log("Pet add " + JSON.stringify(petToAdd))
    return this.httpClient.post<Pet>(this.baseURL + "/pet/add/" + petToAdd.owner.id, petToAdd);
  }

  //HTTP GET REQUEST  -> READ
  getAllPets(): Observable<Pet[]> {
    return this.httpClient.get<Pet[]>(this.baseURL + "/pet/get");
  }

  //HTTP GET REQUEST  -> READ
  getPetsByOwner(name: string): Observable<Pet[]> {
    return this.httpClient.get<Pet[]>(this.backendURL + "/pet/get_by_name", { params: new HttpParams().set('name', name) })
  }

  // HTTP PUT REQUEST -> UPDATE
  updatePet(updatedPet: Pet): Observable<Pet> {
    return this.httpClient.put<Pet>(this.baseURL + "/pet/update/" + updatedPet.id, updatedPet);
  }

  // HTTP DELETE REQUEST -> DELETE
  deletePet(petToDelete: number): Observable<Pet> {
    return this.httpClient.delete<Pet>(this.backendURL + "/pet/delete/" + petToDelete);
  }

}