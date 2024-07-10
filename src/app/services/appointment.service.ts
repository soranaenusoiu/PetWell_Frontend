import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../interfaces/schedule';
import { Veterinary } from '../interfaces/veterinary';
import { Appointment } from '../interfaces/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseURL = "http://localhost:8080";
  private backendURL = "http://localhost:8080";

  constructor(private httpClient:HttpClient) { }

  addAppointment(appointment: Appointment): Observable<Appointment> {
    console.log("Appointment to add: "+JSON.stringify(appointment));
    return this.httpClient.post<Appointment>(this.baseURL + "/appointment/add", appointment);
  }

  getAllAppointments(): Observable<Appointment[]> {
    return this.httpClient.get<Appointment[]>(this.baseURL + "/appointment/get/all");
  }

  updateAppointment(appointment: Appointment): Observable<Appointment> {
    return this.httpClient.put<Appointment>(this.baseURL + "/appointment/update", appointment);
  } 

  deleteAppointment(idToDelete: number): Observable<Appointment>{
    return this.httpClient.delete<Appointment>(this.backendURL+"/appointment/deleteById/"+idToDelete);
  }

}
