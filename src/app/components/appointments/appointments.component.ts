import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment';
import { Veterinary } from 'src/app/interfaces/veterinary';
import { ScheduleDay } from 'src/app/interfaces/scheduleday';
import { Pet } from 'src/app/interfaces/pet';
import { Owner } from 'src/app/interfaces/owner';
import { AppointmentService } from 'src/app/services/appointment.service';
import { VeterinariesService } from 'src/app/services/veterinary.service';
import { PetService } from 'src/app/services/pet.service';
import { OwnersService } from 'src/app/services/owners.service';
import { format } from 'date-fns';



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {

  appointmentsist: Appointment[] = [];
  veterinaryWork: Veterinary = { "id": 0, "mail": "", "name": "", "phone": "", "speciality": "" };
  ownerWork: Owner = { "id": 0, "name": "", "phone": "", "email": "", "address": "" };
  petWork: Pet = { "id": 0, "species": "", "breed": "", "name": "", "age": 0, "weight": 0.00, "owner": this.ownerWork };
  appointmentWork: Appointment = { "id": 0, "initTime": "", "endTime": "", "reason": "", "diagnosis": "", "treatment": "", "veterinary": this.veterinaryWork, "pet": this.petWork };
  selectedAppointment: Appointment;
  schDayWork: ScheduleDay = { "startDay": "", "startTime": "", "stopDay": "", "stopTime": "" };
  petList: Pet[] = [];

  constructor(private appointmentService: AppointmentService, private vetsService: VeterinariesService,
    private ownerService: OwnersService, private petService: PetService) { }

  ngOnInit(): void {

    this.refreshList();
  }

  refreshList() {
    this.appointmentService.getAllAppointments().subscribe((data: Appointment[]) => {
      this.appointmentsist = data;
      console.log("Appointments list: " + JSON.stringify(this.appointmentsist));
    })
  }

  clickAddButton() {
    this.appointmentWork.id = 0;
    this.appointmentWork.initTime = this.schDayWork.startDay + "T" + this.schDayWork.startTime;
    this.appointmentWork.endTime = this.schDayWork.stopDay + "T" + this.schDayWork.stopTime;
    if (this.appointmentWork.initTime.length == 0 || this.appointmentWork.endTime.length == 0 ||
      this.appointmentWork.veterinary.name.length == 0 || this.appointmentWork.pet.owner.name.length == 0) return;
    this.petService.getPetsByOwner(this.appointmentWork.pet.owner.name).subscribe((data: Pet[]) => {
      this.appointmentWork.pet = data[0];
      console.log("Pet found: " + JSON.stringify(this.appointmentWork.pet));
      this.vetsService.getVeterinaryByName(this.appointmentWork.veterinary.name).subscribe((data: Veterinary) => {
        this.appointmentWork.veterinary = data;
        console.log("Find veterinary by name: " + JSON.stringify(this.appointmentWork.veterinary));
        console.log("Appointment to add is: " + JSON.stringify(this.appointmentWork));
        this.appointmentService.addAppointment(this.appointmentWork).subscribe((resp: any) => {
          console.log("Appointment added: " + JSON.stringify(resp));
          this.refreshList();
        })
      })
    });
  }

  clickFindButton() {

  }

  clickEditButton() {
    this.appointmentWork.initTime = this.schDayWork.startDay + "T" + this.schDayWork.startTime;
    this.appointmentWork.endTime = this.schDayWork.stopDay + "T" + this.schDayWork.stopTime;
    if (this.appointmentWork.initTime.length == 0 || this.appointmentWork.endTime.length == 0 ||
      this.appointmentWork.veterinary.name.length == 0 || this.appointmentWork.pet.owner.name.length == 0) return;
    this.petService.getPetsByOwner(this.appointmentWork.pet.owner.name).subscribe((data: Pet[]) => {
      this.petList = data;
// Aici trebuie cautat pet cu numele introdus in lista owner
      this.appointmentWork.pet = this.petList[0];

      console.log("Pet found: " + JSON.stringify(this.appointmentWork.pet));
      this.vetsService.getVeterinaryByName(this.appointmentWork.veterinary.name).subscribe((data: Veterinary) => {
        this.appointmentWork.veterinary = data;
        console.log("Veterinary found: " + JSON.stringify(this.appointmentWork.veterinary));
        console.log("Appointment to updated is: " + JSON.stringify(this.appointmentWork));
        this.appointmentService.updateAppointment(this.appointmentWork).subscribe((resp: any) => {
          console.log("Appointment added: " + JSON.stringify(resp));
          this.refreshList();
        })
      })
    });
  }

  clickDelButton() {
    console.log("Appointment to deleted : " + JSON.stringify(this.appointmentWork));
    this.appointmentService.deleteAppointment(this.appointmentWork.id).subscribe((resp: any) => {
      console.log("Delete schedule : " + JSON.stringify(resp));
      this.refreshList();
    });
  }

  clickResetButton() {
    this.appointmentWork.id = 0;
    this.appointmentWork.pet.owner.name = "";
    this.appointmentWork.pet.name = "";
    this.appointmentWork.reason = "";
    this.appointmentWork.veterinary.name = "";
    this.appointmentWork.initTime = "";
    this.appointmentWork.endTime = "";
    this.schDayWork.startDay = "";
    this.schDayWork.startTime = "";
    this.schDayWork.stopDay = "";
    this.schDayWork.stopTime = "";
  }

  clickListItemApp(app: Appointment) {
    this.appointmentWork.id = app.id;
    this.appointmentWork.pet.owner.id = app.pet.owner.id;
    this.appointmentWork.pet.owner.name = app.pet.owner.name;
    this.appointmentWork.pet.name = app.pet.name;
    this.appointmentWork.pet.id = app.pet.id;
    this.appointmentWork.reason = app.reason;
    this.appointmentWork.veterinary.name = app.veterinary.name;
    this.appointmentWork.veterinary.id = app.veterinary.id;
    this.appointmentWork.initTime = app.initTime;
    this.appointmentWork.endTime = app.endTime;
    this.schDayWork.startDay = format(new Date(this.appointmentWork.initTime), 'yyyy-MM-dd');
    this.schDayWork.startTime = format(new Date(this.appointmentWork.initTime), 'hh:mm');
    this.schDayWork.stopDay = format(new Date(this.appointmentWork.endTime), 'yyyy-MM-dd');
    this.schDayWork.stopTime = format(new Date(this.appointmentWork.endTime), 'hh:mm');

  }

  ChOwnerName() {
    alert("Change");

  }

}
