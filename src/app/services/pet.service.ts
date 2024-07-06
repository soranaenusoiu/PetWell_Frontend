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
  getPetsByOwner(): Observable<Pet> {
    let name: string = "Matei Barbarasa";
    return this.httpClient.get<Pet>(this.backendURL + "/pet/get_by_name", { params: new HttpParams().set('name', name) })
  }

  // HTTP PUT REQUEST -> UPDATE
  updatePet(): Observable<Pet> {
    const pet = {
      id: 2,
      species: "cat",
      breed: "common",
      name: "Mrs. Cuddles",
      age: "3",
      weight: "3.7"
    };

    return this.httpClient.put<Pet>(this.baseURL + "/pet/update/2", pet);
  }

  // HTTP DELETE REQUEST -> DELETE
  deletePet(petToDelete: number): Observable<Pet> {
    return this.httpClient.delete<Pet>(this.backendURL + "/pet/delete/" + petToDelete);
  }

}