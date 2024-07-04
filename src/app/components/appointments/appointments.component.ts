import { DOCUMENT } from '@angular/common';
import { Component, OnInit,OnChanges } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment';
import { Veterinary } from 'src/app/interfaces/veterinary';
import { Pet } from 'src/app/interfaces/pet';
import { Owner } from 'src/app/interfaces/owner';
import { AppointmentService} from 'src/app/services/appointment.service';
import { VeterinariesService} from 'src/app/services/veterinary.service';
import { PetService} from 'src/app/services/pet.service';
import { OwnersService} from 'src/app/services/owners.service';
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {

  appointmentsist: Appointment[] = [];
  veterinaryWork: Veterinary={"id":0,"mail":"","name":"","phone":"","speciality":""};
  ownerWork: Owner={ "id":0, "name":"","phone":"","email":"","address":""};
  petWork: Pet={"id":0, "species":"","breed":"","name":"","age":0,"weight":0.00 ,"owner":this.ownerWork};
  appointmentWork: Appointment ={"id": 0,"initTime": "","endTime": "","reason": "","diagnosis": "", "treatment":"","veterinary":this.veterinaryWork,"pet":this.petWork };
  selectedAppointment:Appointment;

  constructor(private appointmentService: AppointmentService, private vetsService: VeterinariesService,
    private ownerService: OwnersService, private petService: PetService){ }

  ngOnInit(): void {

    // this.scheduleService.getAllSchedules().subscribe((data:Schedule[])=>{
    //   this.schedulesList = data;
    //   console.log("Veterinaries list: " + JSON.stringify(this.schedulesList));
    // })
  }

  clickAddButton(){

  }

  clickFindButton(){

  }

  clickEditButton(){

  }

  clickDelButton(){

  }

  clickResetButton(){

  }

}
