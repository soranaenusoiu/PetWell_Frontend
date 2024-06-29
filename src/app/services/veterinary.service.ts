
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Veterinary } from '../interfaces/veterinary';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
  })
  export class VeterinariesService {
    private baseURL = "http://localhost:8080";
    private backendURL = "http://localhost:8080";
  
    constructor(private httpClient:HttpClient) { }
  
    //HTTP Verbs Requests : GET, GET BY ID, POST, PUT, DELETE => through a HttpClientModule
  
    //HTTP GET REQUEST  -> READ
    getAllVeterinaries(): Observable<Veterinary[]> {
      return this.httpClient.get<Veterinary[]>(this.baseURL + "/veterinary/getAll");
    }
  
    //HTTP GET BY ID REQUEST -> READ
    // getVeterinaryById(id:any):Observable<Veterinary>{
    //   return this.httpClient.get<Veterinary>(this.baseURL + "/veterinary/" + id);
    // }
  
  //HTTP GET REQUEST
    putVeterinary(): Observable<Veterinary>{
      const veterinary =  {
        id : 1,
        name :"Ion Andreescu",
        phone : "074777495723",
        mail : "ionandreescu@gmail.com",
        speciality : "dentist"
      };
      return this.httpClient.put<Veterinary>(this.baseURL + "/veterinary/update", veterinary);
    }
  
  }
