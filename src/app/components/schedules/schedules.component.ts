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

    // this.scheduleService.getScheduleById().subscribe((data:Schedule)=>{
    //   this.scheduleWork = data;
    //   console.log("Veterinaries list: " + JSON.stringify(this.scheduleWork));
    // })

    // this.scheduleService.getByVetByMonth().subscribe((data:Schedule[])=>{
    //   this.schedulesList = data;
    //   console.log("Veterinaries list: " + JSON.stringify(this.schedulesList));
    // })

    this.scheduleService.getAllSchedules().subscribe((data:Schedule[])=>{
      this.schedulesList = data;
      console.log("Veterinaries list: " + JSON.stringify(this.schedulesList));
    })

    // this.scheduleService.updateSchedule().subscribe((resp:any)=>{
    //    console.log(JSON.stringify(resp));
    // });

    // this.scheduleService.deleteSchedule().subscribe((resp:any)=>{
    //   console.log(JSON.stringify(resp));
    // });

  }

  clickAddButton(){
      // alert("schduleWork");
      this.scheduleWork.id=0;
      let veterinaryName : string = this.scheduleWork.veterinary.name;
  // trebuie gasit veterinarul cu numele transmis ca parametru    
      console.log("1. Init add ");
      this.vetsService.getVeterinaryByName(veterinaryName).subscribe((data:Veterinary)=>{
        this.scheduleWork.veterinary = data;
        console.log("2. After to Veterinary found: " + JSON.stringify(this.scheduleWork));

        this.scheduleService.addSchedule(this.scheduleWork).subscribe((resp:any)=>{
          console.log("3. Schedule add: "+JSON.stringify(resp));

          this.scheduleService.getAllSchedules().subscribe((data:Schedule[])=>{
            this.schedulesList = data;
            console.log("Veterinaries list: " + JSON.stringify(this.schedulesList));
          }) 
       })

    }); 
  // location.reload();
    
  }
  clickDelButton(){
    // alert("schduleWork");
    console.log("Schedule to deleted : "+JSON.stringify(this.scheduleWork));
     this.scheduleService.deleteSchedule(this.scheduleWork.id).subscribe((resp:any)=>{
       console.log(JSON.stringify(resp));
     }); 
    location.reload();
  }
  clickListItemSch(sch: Schedule) {
    this.scheduleWork.id=sch.id;
    this.scheduleWork.startTime=sch.startTime;
    this.scheduleWork.stopTime=sch.stopTime;
    this.scheduleWork.veterinary.name=sch.veterinary.name;
    this.scheduleWork.veterinary.id=sch.veterinary.id;
  }

}


