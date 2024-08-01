
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
  
    addVeterinary(veterinaryAdd: Veterinary): Observable<Veterinary> {
      return this.httpClient.post<Veterinary>(this.backendURL + "/veterinary/add", veterinaryAdd);
    }

    getAllVeterinaries(): Observable<Veterinary[]> {
      return this.httpClient.get<Veterinary[]>(this.backendURL + "/veterinary/getAll");
    }

    getVeterinaryByName(veterinaryName: string): Observable<Veterinary> {
console.log("Find veterinary BY NAME   : " + JSON.stringify(veterinaryName));            
      return this.httpClient.get<Veterinary>(this.backendURL + "/veterinary/getByName/"+veterinaryName);
    }
  
    updateVeterinary(veterinaryUpdate: Veterinary): Observable<Veterinary>{
      return this.httpClient.put<Veterinary>(this.backendURL + "/veterinary/update", veterinaryUpdate);
    }

    deleteVeterinary(idToDelete: number): Observable<Veterinary>{
      return this.httpClient.delete<Veterinary>(this.backendURL + "/veterinary/deleteById/"+idToDelete);
    }
 
  }
