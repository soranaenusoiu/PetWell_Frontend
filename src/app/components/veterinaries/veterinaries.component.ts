import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnChanges } from '@angular/core';
import { Veterinary } from 'src/app/interfaces/veterinary';
import { VeterinariesService } from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-veterinaries',
  templateUrl: './veterinaries.component.html',
  styleUrls: ['./veterinaries.component.scss']
})
export class VeterinariesComponent {

  veterinariesList: Veterinary[] = [];
  veterinaryWork: Veterinary = { "id": 0, "name": "", "phone": "", "mail": "", "speciality": "" };
  tipSortList: string = "sortByName";
  password: string = "";

  constructor(private vetsService: VeterinariesService) { }

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.vetsService.getAllVeterinaries().subscribe((data: Veterinary[]) => {
      this.veterinariesList = data;
      console.log("All veterinaries list: " + JSON.stringify(this.veterinariesList));
      if (this.tipSortList === "sortByName") {
        this.clickOrdereByName();
        return;
      }
      if (this.tipSortList === "sortBySpeciality") {
        this.clickOrdereBySpeciality();
        return;
      }
    })
  }

  clickAddButton() {
    this.veterinaryWork.id = 0;
    if (this.veterinaryWork.name.trim().length <= 0) return;
    this.veterinaryWork.name = this.veterinaryWork.name.trim();
    this.vetsService.addVeterinary({ veterinary: this.veterinaryWork, password: this.password }).subscribe((resp: any) => {
      console.log("Add veterinary: " + JSON.stringify(resp));
      this.refreshList();
    });
  }

  clickDelButton() {
    if (this.veterinaryWork.id <= 0) return;
    this.vetsService.deleteVeterinary(this.veterinaryWork.id).subscribe((resp: any) => {
      console.log("Delete veterinary : " + JSON.stringify(resp));
      this.refreshList();
    });
  }

  clickFindButton() {
    //   if (this.veterinaryWork.id <= 0) return;
    console.log("Find veterinary by NAME   : " + JSON.stringify(this.veterinaryWork.name));
    this.vetsService.getVeterinaryByName(this.veterinaryWork.name).subscribe((data: Veterinary) => {
      this.veterinaryWork = data;
      console.log("Find veterinary by NAME: " + JSON.stringify(this.veterinaryWork));
    })
  }

  clickEditButton() {
    if (this.veterinaryWork.id <= 0) return;
    this.vetsService.updateVeterinary(this.veterinaryWork).subscribe((resp: any) => {
      console.log("Update veterinary: " + JSON.stringify(resp));
      this.refreshList();
    });
  }

  clickResetButton() {
    this.veterinaryWork.id = 0;
    this.veterinaryWork.mail = "";
    this.veterinaryWork.name = "";
    this.veterinaryWork.phone = "";
    this.veterinaryWork.speciality = "";
  }

  clickListItemVet(vet: Veterinary) {
    this.veterinaryWork.id = vet.id;
    this.veterinaryWork.name = vet.name;
    this.veterinaryWork.phone = vet.phone;
    this.veterinaryWork.mail = vet.mail;
    this.veterinaryWork.speciality = vet.speciality;
  }

  clickOrdereByName() {
    this.veterinariesList.sort(((a: Veterinary, b: Veterinary) => a.name.localeCompare(b.name)));
  }

  clickOrdereBySpeciality() {
    this.veterinariesList.sort(((a: Veterinary, b: Veterinary) => a.speciality.localeCompare(b.speciality)));
  }

}
