import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Appointment } from 'src/app/interfaces/appointment';
import { Veterinary } from 'src/app/interfaces/veterinary';
import { ScheduleDay } from 'src/app/interfaces/scheduleday';
import { Pet } from 'src/app/interfaces/pet';
import { Owner } from 'src/app/interfaces/owner';
import { AppointmentService } from 'src/app/services/appointment.service';
import { VeterinariesService } from 'src/app/services/veterinary.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { PetService } from 'src/app/services/pet.service';
import { OwnersService } from 'src/app/services/owners.service';
import { format } from 'date-fns';
import { VeterinariesComponent } from '../veterinaries/veterinaries.component';
import { Schedule } from 'src/app/interfaces/schedule';



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
  scheduleList: Schedule[] = [];
  tipForList: string = "allAppointments";

  constructor(private appointmentService: AppointmentService, private vetsService: VeterinariesService,
    private ownerService: OwnersService, private petService: PetService, private schService: ScheduleService) { }

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

    const isTimeValid = this.scheduleList.some(schedule =>
      this.appointmentWork.initTime >= schedule.startTime && this.appointmentWork.endTime <= schedule.stopTime
    );
  
    if (!isTimeValid) {
      alert("The selected time is not available for the chosen vet. Please select a different time slot.");
      return;
    }

    if (this.appointmentsist.some(appointment =>
      appointment.veterinary.id === this.appointmentWork.veterinary.id &&
      appointment.initTime === this.appointmentWork.initTime
    )) {
      alert("The selected vet is already booked at the chosen time. Please select a different time slot.");
      return;
    }
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
          this.tipForList = "allAppointments";
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
    this.initSchDayWork();
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
    this.initSchDayWork();
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
    this.initSchDayWork();
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
    this.initSchDayWork();
    this.schDayWork.startDay = format(new Date(), 'yyyy-MM-dd');
    this.schDayWork.startTime = format(new Date(), 'HH:mm');
    // this.schDayWork.stopDay = format(new Date(), 'yyyy-MM-dd');
    // this.schDayWork.stopTime = format(new Date(), 'HH:mm');
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
        ownerChose.name = "";
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

  clickChoseSchedule(veterinaryId: number, day: string) {
    // alert("Schedule time");
    // this.appointmentWork.veterinary.name = "";
    // this.initSchDayWork();
    this.schService.getByVetByMonth(veterinaryId, day).subscribe((data: Schedule[]) => {
      this.scheduleList = data;
      console.log("All schedule/veterinary/month list: " + JSON.stringify(this.scheduleList));
      this.appointmentsist = [];
      let app: Appointment = { "id": 0, "initTime": "", "endTime": "", "reason": "", "diagnosis": "", "treatment": "", "veterinary": this.veterinaryWork, "pet": this.petWork };
      let ownerChose: Owner;
      let petChose: Pet;
      let vetChose: Veterinary;
      this.scheduleList.forEach((sch: Schedule) => {
        app = new Appointment;
        petChose = new Pet;
        ownerChose = new Owner;
        ownerChose.name = "";
        vetChose = new Veterinary;
        petChose.owner = ownerChose;
        petChose.name = "";
        vetChose.name = "";
        vetChose.id = 0;
        app.veterinary = vetChose;
        app.pet = petChose;
        app.reason = "";
        app.initTime = sch.startTime;
        app.endTime = sch.stopTime;
        console.log("App: " + JSON.stringify(app));
        this.appointmentsist.push(app);
      })
      console.log("All schedule one veterinary one month listy: " + JSON.stringify(this.veterinaryList));
    })
  }

  freeTime(veterinaryId: number, dayWork: string) {
    console.log("Appointments free ___ : " + JSON.stringify(this.appointmentsist));
    this.appointmentService.getFreeAppointments(veterinaryId, dayWork).subscribe((data: Appointment[]) => {
      this.appointmentsist = data;
      let ownerChose: Owner;
      let petChose: Pet;
      let vetChose: Veterinary;
      this.appointmentsist.forEach(app => {
        ownerChose = new Owner;
        ownerChose.name = "";
        petChose = new Pet;
        petChose.owner = ownerChose;
        petChose.name = "";
        vetChose = new Veterinary;
        vetChose.name = "";
        vetChose.id = 0;
        app.veterinary = vetChose;
        app.pet = petChose;
        app.reason = "";
        // app.initTime = sch.startTime;
        // app.endTime = sch.stopTime;

        // app.pet = this.petWork;
        // app.pet.owner = this.ownerWork; 
        // app.veterinary = this.veterinaryWork;
      });
      console.log("Appointments FREE0 list: " + veterinaryId + " " + dayWork);
      console.log("Appointments FREE1 list: " + JSON.stringify(this.appointmentsist));
    });
  }

  initSchDayWork() {
    this.schDayWork.startDay = "";
    this.schDayWork.startTime = "";
    this.schDayWork.stopDay = "";
    this.schDayWork.stopTime = "";
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
