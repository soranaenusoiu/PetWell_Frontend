import { DatePipe, formatDate } from '@angular/common';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { waitForAsync } from '@angular/core/testing';
import { Schedule } from 'src/app/interfaces/schedule';
import { ScheduleDay } from 'src/app/interfaces/scheduleday';
import { Veterinary } from 'src/app/interfaces/veterinary';
import { ScheduleService } from 'src/app/services/schedule.service';
import { VeterinariesService } from 'src/app/services/veterinary.service';
import { format } from 'date-fns';


@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  styleUrls: ['./schedules.component.scss']
})

export class SchedulesComponent {
  schedulesList: Schedule[] = [];
  veterinaryWork: Veterinary = { "id": 0, "mail": "", "name": "", "phone": "", "speciality": "" };
  scheduleWork: Schedule = { "id": 0, "startTime": "", "stopTime": "", "veterinary": this.veterinaryWork };
  schDayWork: ScheduleDay = { "startDay": "", "startTime": "", "stopDay": "", "stopTime": ""};
  tipForList: string="allVeterinary";

  constructor(private scheduleService: ScheduleService, private vetsService: VeterinariesService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.scheduleService.getAllSchedules().subscribe((data: Schedule[]) => {
      this.schedulesList = data;
      console.log("Schedule list: " + JSON.stringify(this.schedulesList));
      if (this.tipForList==="oneVeterinary") {
        this.clickOneVeterinary(this.scheduleWork.veterinary.name);
        return;
      }
      if (this.tipForList==="oneVeterinaryOneMonth") {
        this.clickOneVeterinaryOnemonth(this.scheduleWork.veterinary.id, this.schDayWork.startDay);
        return;
      }
    })
  }

  clickAddButton() {
    this.scheduleWork.id = 0;
    this.scheduleWork.startTime = this.schDayWork.startDay + "T" + this.schDayWork.startTime;
    this.scheduleWork.stopTime = this.schDayWork.stopDay + "T" + this.schDayWork.stopTime;
    if (this.scheduleWork.startTime.length == 0 || this.scheduleWork.stopTime.length == 0 || this.scheduleWork.veterinary.name.length == 0) return;
console.log("Veterinary TO find: " + JSON.stringify(this.scheduleWork.veterinary.name));    
    this.vetsService.getVeterinaryByName(this.scheduleWork.veterinary.name).subscribe((data: Veterinary) => {
      this.scheduleWork.veterinary = data;
      console.log("Veterinary found: " + JSON.stringify(this.scheduleWork.veterinary));

      this.scheduleService.addSchedule(this.scheduleWork).subscribe((resp: any) => {
        console.log("Schedule add: " + JSON.stringify(resp));
        this.refreshList();
      })
    });
  }

  clickDelButton() {
    console.log("Schedule to deleted : " + JSON.stringify(this.scheduleWork));
    this.scheduleService.deleteSchedule(this.scheduleWork.id).subscribe((resp: any) => {
      console.log("Delete schedule : " + JSON.stringify(resp));
      this.refreshList();
    });
  }

  clickEditButton() {
    if (this.scheduleWork.stopTime.length == 0 || this.scheduleWork.stopTime.length == 0
      || this.scheduleWork.veterinary.name.length == 0) return;
    this.scheduleWork.startTime = this.schDayWork.startDay + "T" + this.schDayWork.startTime;
    this.scheduleWork.stopTime = this.schDayWork.stopDay + "T" + this.schDayWork.stopTime;
    this.vetsService.getVeterinaryByName(this.scheduleWork.veterinary.name).subscribe((data: Veterinary) => {
      this.scheduleWork.veterinary = data;
      console.log("Veterinary found: " + JSON.stringify(this.scheduleWork.veterinary));
      this.scheduleService.updateSchedule(this.scheduleWork).subscribe((resp: any) => {
        console.log("Schedule add: " + JSON.stringify(resp));
        this.refreshList();
      })
    });
  }

  clickResetButton() {
    this.scheduleWork.id = 0;
    this.scheduleWork.startTime = "";
    this.scheduleWork.stopTime = "";
    this.scheduleWork.veterinary = this.veterinaryWork;
    this.veterinaryWork.id = 0;
    this.veterinaryWork.name = "";
    this.veterinaryWork.mail = "";
    this.veterinaryWork.phone = "";
    this.veterinaryWork.speciality = "";
    this.schDayWork.startDay = "";
    this.schDayWork.startTime = "";
    this.schDayWork.stopDay = "";
    this.schDayWork.stopTime = "";

  }

  clickListItemSch(sch: Schedule) {
    this.scheduleWork.id = sch.id;
    this.scheduleWork.startTime = sch.startTime;
    this.scheduleWork.stopTime = sch.stopTime;
    this.scheduleWork.veterinary.name = sch.veterinary.name;
    this.scheduleWork.veterinary.id = sch.veterinary.id;
    this.schDayWork.startDay = format(new Date(this.scheduleWork.startTime), 'yyyy-MM-dd');
    this.schDayWork.startTime = format(new Date(this.scheduleWork.startTime), 'HH:mm');
    this.schDayWork.stopDay = format(new Date(this.scheduleWork.stopTime), 'yyyy-MM-dd');
    this.schDayWork.stopTime = format(new Date(this.scheduleWork.stopTime), 'HH:mm');
  }




  clickForAllVeterinarians() {
    this.scheduleService.getAllSchedules().subscribe((data: Schedule[]) => {
      this.schedulesList = data;
      console.log("Veterinaries list: " + JSON.stringify(this.schedulesList));
    })
  }

  clickOneVeterinary(nameVeterinary: string) {
    // se reciteste lista pentru cazul unui apel dupa OneVeterinaryOne Month
    this.scheduleService.getAllSchedules().subscribe((data: Schedule[]) => {
      this.schedulesList = data;
      console.log("Veterinaries list: " + JSON.stringify(this.schedulesList));
      this.schedulesList = this.schedulesList.filter(predicatef);
      function predicatef(value: Schedule) {
        return value.veterinary.name === nameVeterinary;
      }
    })
  }

  clickOneVeterinaryOnemonth(veterinaryId:number,day:string) {
    this.scheduleService.getByVetByMonth(veterinaryId,day ).subscribe((data: Schedule[]) => {
      this.schedulesList = data;
      console.log("One VeterinarY one month list: " + JSON.stringify(this.schedulesList));
    })
    // this.schedulesList = this.schedulesList.filter(predicatef)
    // function predicatef(value: Schedule) {
    //   return ( value.veterinary.name === nameVeterinary &&
    //     format(new Date(value.startTime), 'MM') ===format(new Date(dataFind), 'MM'));
    // }

  }

}


