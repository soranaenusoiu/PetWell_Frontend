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
import { VeterinariesComponent } from '../veterinaries/veterinaries.component';



@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent {

  appointmentsist: Appointment[] = [];
  appointmentsFreeList: Appointment[] = [];
  veterinaryWork: Veterinary = { "id": 0, "mail": "", "name": "", "phone": "", "speciality": "" };
  ownerWork: Owner = { "id": 0, "name": "", "phone": "", "email": "", "address": "" };
  petWork: Pet = { "id": 0, "species": "", "breed": "", "name": "", "age": 0, "weight": 0.00, "owner": this.ownerWork };
  appointmentWork: Appointment = { "id": 0, "initTime": "", "endTime": "", "reason": "", "diagnosis": "", "treatment": "", "veterinary": this.veterinaryWork, "pet": this.petWork };
  selectedAppointment: Appointment;
  schDayWork: ScheduleDay = { "startDay": "", "startTime": "", "stopDay": "", "stopTime": "" };
  petList: Pet[] = [];
  ownerList: Owner[] = [];
  veterinaryList: Veterinary[] = [];
  tipForList: string = "allAppointments";

  constructor(private appointmentService: AppointmentService, private vetsService: VeterinariesService,
    private ownerService: OwnersService, private petService: PetService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.appointmentService.getAllAppointments().subscribe((data: Appointment[]) => {
      this.appointmentsist = data;
      console.log("Appointments list: " + JSON.stringify(this.appointmentsist));
    });
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
    alert("Find buton");
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
    if (app.id != 0) this.appointmentWork.id = app.id;
    if (app.pet.owner.name.length > 0) {
      this.appointmentWork.pet.owner.id = app.pet.owner.id;
      this.appointmentWork.pet.owner.name = app.pet.owner.name;
    }
    if (app.pet.name.length > 0) {
      this.appointmentWork.pet.name = app.pet.name;
      this.appointmentWork.pet.id = app.pet.id;
    }
    if (app.reason.length > 0) this.appointmentWork.reason = app.reason;
    if (app.veterinary.name) {
      this.appointmentWork.veterinary.name = app.veterinary.name;
      this.appointmentWork.veterinary.id = app.veterinary.id;
    }
    this.appointmentWork.initTime = app.initTime;
    this.appointmentWork.endTime = app.endTime;
    if (app.initTime.length > 0) {
      this.schDayWork.startDay = format(new Date(this.appointmentWork.initTime), 'yyyy-MM-dd');
      this.schDayWork.startTime = format(new Date(this.appointmentWork.initTime), 'HH:mm');
    }
    if (app.endTime.length > 0) {
      this.schDayWork.stopDay = format(new Date(this.appointmentWork.endTime), 'yyyy-MM-dd');
      this.schDayWork.stopTime = format(new Date(this.appointmentWork.endTime), 'HH:mm');
    }
  }

  clickAllAppointments() {
    this.appointmentService.getAllAppointments().subscribe((data: Appointment[]) => {
      this.appointmentsist = data;
      console.log("Appointments list: " + JSON.stringify(this.appointmentsist));
    });
  }

  clickChoseOwners() {
    // alert("Owners time");
    this.appointmentWork.id = 0;
    this.appointmentWork.pet.owner.name = "";
    this.appointmentWork.pet.name = "";
    this.appointmentWork.reason = "";
    this.appointmentWork.veterinary.name = "";
    this.schDayWork.startDay = "";
    this.schDayWork.startTime = "";
    this.schDayWork.stopDay = "";
    this.schDayWork.stopTime = "";
    this.ownerService.getAllOwners().subscribe((data: Owner[]) => {
      this.ownerList = data;
      console.log("All owners list: " + JSON.stringify(this.ownerList));
      this.appointmentsist = [];
      let app: Appointment = { "id": 0, "initTime": "", "endTime": "", "reason": "", "diagnosis": "", "treatment": "", "veterinary": this.veterinaryWork, "pet": this.petWork };
      let ownerChose: Owner;
      let petChose: Pet;
      this.ownerList.forEach((own: Owner) => {
        app = new Appointment;
        petChose = new Pet;
        ownerChose = new Owner;
        ownerChose.name = own.name;
        petChose.owner = ownerChose;
        petChose.name = "";
        console.log("Pet: " + JSON.stringify(petChose));
        this.veterinaryWork.name = "";
        app.veterinary = this.veterinaryWork;
        app.pet = petChose;
        app.reason = "";
        app.initTime = "";
        app.endTime = "";
        //  app.pet.owner.name="ggg";
        this.appointmentsist.push(app);
      })
      console.log("All owners list: " + JSON.stringify(this.ownerList));
    })
  }

  clickChosePet(ownerChosen: string) {
    // alert("Pets time");
    this.appointmentWork.pet.name = "";
    this.appointmentWork.reason = "";
    this.appointmentWork.veterinary.name = "";
    this.schDayWork.startDay = "";
    this.schDayWork.startTime = "";
    this.schDayWork.stopDay = "";
    this.schDayWork.stopTime = "";
    this.petService.getPetsByOwner(ownerChosen).subscribe((data: Pet[]) => {
      this.petList = data;
      console.log("All pet/owners list: " + JSON.stringify(this.petList));
      this.appointmentsist = [];
      let app: Appointment = { "id": 0, "initTime": "", "endTime": "", "reason": "", "diagnosis": "", "treatment": "", "veterinary": this.veterinaryWork, "pet": this.petWork };
      let petChose: Pet;
      this.petList.forEach((pet: Pet) => {
        app = new Appointment;
        petChose = new Pet;
        petChose.owner = this.ownerWork;
        petChose.name = pet.name
        console.log("Pet: " + JSON.stringify(petChose));
        this.veterinaryWork.name = "";
        app.veterinary = this.veterinaryWork;
        app.pet = petChose;
        app.reason = "";
        app.initTime = "";
        app.endTime = "";
        this.appointmentsist.push(app);
      })
      console.log("All pets/owner list: " + JSON.stringify(this.ownerList));
    })
  }


  clickChoseVeterinary() {
    // alert("Veterinary time");
    this.appointmentWork.veterinary.name = "";
    this.schDayWork.startDay = "";
    this.schDayWork.startTime = "";
    this.schDayWork.stopDay = "";
    this.schDayWork.stopTime = "";
    this.vetsService.getAllVeterinaries().subscribe((data: Veterinary[]) => {
      this.veterinaryList = data;
      console.log("All verterinary list: " + JSON.stringify(this.veterinaryList));
      this.appointmentsist = [];
      let app: Appointment = { "id": 0, "initTime": "", "endTime": "", "reason": "", "diagnosis": "", "treatment": "", "veterinary": this.veterinaryWork, "pet": this.petWork };
      let ownerChose: Owner;
      let petChose: Pet;
      let vetChose: Veterinary;
      this.veterinaryList.forEach((vet: Veterinary) => {
        app = new Appointment;
        petChose = new Pet;
        ownerChose = new Owner;
        ownerChose.name="";
        vetChose = new Veterinary;
        petChose.owner = ownerChose;
        petChose.name = "";
        vetChose.name = vet.name;
        vetChose.id = vet.id;
        app.veterinary = vetChose;
        app.pet = petChose;
        app.reason = "";
        app.initTime = "";
        app.endTime = "";
        console.log("App: " + JSON.stringify(app));
        this.appointmentsist.push(app);
      })
      console.log("All veterinary listy: " + JSON.stringify(this.veterinaryList));
    })
  }

  freeTime(veterinaryId: number, dayWork: string) {
    // alert("free time");
    console.log("Appointments free ___ : " + JSON.stringify(this.appointmentsist));
    this.appointmentService.getFreeAppointments(veterinaryId, dayWork).subscribe((data: Appointment[]) => {
      this.appointmentsist = data;
      this.petWork.name = "";
      this.appointmentsist.forEach(app => (app.pet = this.petWork, app.pet.owner = this.ownerWork, app.veterinary = this.veterinaryWork));
      console.log("Appointments FREE0 list: " + veterinaryId + " " + dayWork);
      console.log("Appointments FREE1 list: " + JSON.stringify(this.appointmentsist));
    });
  }


  ChOwnerName(nameOwner: string) {
    this.appointmentService.getAllAppointments().subscribe((data: Appointment[]) => {
      this.appointmentsist = data;
      console.log("Appointments list: " + JSON.stringify(this.appointmentsist));
    },
      err => console.log(err),
      () => console.log('finish')
    );
    this.appointmentsist.filter(appointment => appointment.pet.owner.name === nameOwner);
  }

}
