import { Component, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Schedule } from 'src/app/interfaces/schedule';
import { Veterinary } from 'src/app/interfaces/veterinary';
import { ScheduleService} from 'src/app/services/schedule.service';
import { VeterinariesService} from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})

export class SchedulesComponent {
  schedulesList: Schedule[] = [];
  veterinaryWork: Veterinary={"id":0,"mail":"","name":"","phone":"","speciality":""}
  scheduleWork: Schedule={"id":0,"startTime":"","stopTime":"","veterinary":this.veterinaryWork};

  constructor(private scheduleService: ScheduleService, private vetsService: VeterinariesService){}

  ngOnInit(): void {

    this.scheduleService.getAllSchedules().subscribe((data:Schedule[])=>{
      this.schedulesList = data;
      console.log("Veterinaries list: " + JSON.stringify(this.schedulesList));
    })
  }

  clickAddButton(){
      this.scheduleWork.id=0;
      if(this.scheduleWork.stopTime.length==0 || this.scheduleWork.stopTime.length==0 || this.scheduleWork.veterinary.name.length==0) return;
      this.vetsService.getVeterinaryByName(this.scheduleWork.veterinary.name).subscribe((data:Veterinary)=>{
        this.scheduleWork.veterinary = data;
        console.log("Veterinary found: " + JSON.stringify(this.scheduleWork));

        this.scheduleService.addSchedule(this.scheduleWork).subscribe((resp:any)=>{
          console.log("Schedule add: "+JSON.stringify(resp));
          // refresh schedules list
          this.scheduleService.getAllSchedules().subscribe((data:Schedule[])=>{
            this.schedulesList = data;
            console.log("Schedules list: " + JSON.stringify(this.schedulesList));
          }) 
       })
      }); 
  }

  clickDelButton(){
    console.log("Schedule to deleted : "+JSON.stringify(this.scheduleWork));
     this.scheduleService.deleteSchedule(this.scheduleWork.id).subscribe((resp:any)=>{
        console.log("Delete schedule : "+JSON.stringify(resp));
        // refresh schedules list
        this.scheduleService.getAllSchedules().subscribe((data:Schedule[])=>{
          this.schedulesList = data;
          console.log("Veterinaries list: " + JSON.stringify(this.schedulesList));
        })  
     }); 
  }
  
  clickEditButton(){
    if(this.scheduleWork.stopTime.length==0 || this.scheduleWork.stopTime.length==0 || this.scheduleWork.veterinary.name.length==0) return;
    this.vetsService.getVeterinaryByName(this.scheduleWork.veterinary.name).subscribe((data:Veterinary)=>{
      this.scheduleWork.veterinary = data;
      console.log("Veterinary found: " + JSON.stringify(this.scheduleWork));

      this.scheduleService.updateSchedule(this.scheduleWork).subscribe((resp:any)=>{
        console.log("Schedule add: "+JSON.stringify(resp));
        // refresh schedules list
        this.scheduleService.getAllSchedules().subscribe((data:Schedule[])=>{
          this.schedulesList = data;
          console.log("Schedules list: " + JSON.stringify(this.schedulesList));}) 
      })
    }); 
  }

  clickResetButton(){
    this.scheduleWork.id=0;
    this.scheduleWork.startTime="";
    this.scheduleWork.stopTime="";
    this.scheduleWork.veterinary=this.veterinaryWork;
    this.veterinaryWork.id=0;
    this.veterinaryWork.name="";
    this.veterinaryWork.mail="";
    this.veterinaryWork.phone="";
    this.veterinaryWork.speciality="";
  }

  clickListItemSch(sch: Schedule) {
    this.scheduleWork.id=sch.id;
    this.scheduleWork.startTime=sch.startTime;
    this.scheduleWork.stopTime=sch.stopTime;
    this.scheduleWork.veterinary.name=sch.veterinary.name;
    this.scheduleWork.veterinary.id=sch.veterinary.id;
  }

  clickForAllVeterinarians(){
    this.scheduleService.getAllSchedules().subscribe((data:Schedule[])=>{
      this.schedulesList = data;
      console.log("Veterinaries list: " + JSON.stringify(this.schedulesList));
    })
  }

  clickOneVeterinary(nameVeterinary: string){
    this.schedulesList=this.schedulesList.filter(predicatef)
    function predicatef(value: Schedule){
        return value.veterinary.name===nameVeterinary;
    }
  }

  clickOneVeterinaryOnemonth(){

  }

}


