import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { Schedule } from '../interfaces/schedule';
import { Veterinary } from '../interfaces/veterinary';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
    private baseURL = "http://localhost:8080";
    private backendURL = "http://localhost:8080";

    constructor(private httpClient:HttpClient) { }

    //  HTTP GET  ALL REQUEST  -> READ

    addSchedule(schedule: Schedule): Observable<Schedule> {
      console.log("Schedule to add: "+JSON.stringify(schedule));
      return this.httpClient.post<Schedule>(this.baseURL + "/schedule/add", schedule);
    }

    getScheduleById(): Observable<Schedule> {
      let idToGet:number = 257;
      //let scheduleToGet:Schedule;
      return this.httpClient.get<Schedule>(this.baseURL + "/schedule/getById/"+idToGet);
    }

    getByVetByMonth(): Observable<Schedule[]> {
      let  veterinary_id: number = 2;
      let month: number =7;
      return this.httpClient.get<Schedule[]>(this.baseURL + "/schedule/getByVetByMonth/"+veterinary_id+"/"+month);
    }

    getAllSchedules(): Observable<Schedule[]> {
      return this.httpClient.get<Schedule[]>(this.baseURL + "/schedule/getAll");
    }

 
    updateSchedule(schedule: Schedule): Observable<Schedule> {
      // let schedule:Schedule =  {
      //   id:256,
      //   startTime :"2024-06-07T12:12:00",
      //   stopTime : "2024-06-07T12:12:44",
      //   veterinary : {id:2,name:"name2",phone:"phone2",mail:"mail2",speciality:"speciality2"}
      // };
      return this.httpClient.put<Schedule>(this.baseURL + "/schedule/update", schedule);
    } 

    deleteSchedule(idToDelete : number): Observable<Schedule>{
      return this.httpClient.delete<Schedule>(this.baseURL + "/schedule/deleteById/"+idToDelete);
    }
}



//   export class VeterinariesService {

//   //HTTP GET REQUEST
//   getByNameVeterinary(name: string): Observable<Veterinary> {
//     let veterinary
//     return this.httpClient.put<Veterinary>(this.baseURL + "/veterinary/getByName/"+name, veterinary);
//   }






 

