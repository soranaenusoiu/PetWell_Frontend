import { DOCUMENT } from '@angular/common';
import { Component, OnInit,OnChanges } from '@angular/core';
import { Veterinary } from 'src/app/interfaces/veterinary';
import { VeterinariesService} from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-veterinaries',
  templateUrl: './veterinaries.component.html',
  styleUrls: ['./veterinaries.component.scss']
})
export class VeterinariesComponent {

  veterinariesList: Veterinary[] = [];
  veterinaryWork: Veterinary ={"id": 0,"name": "","phone": "","mail": "","speciality": ""};
  selectedVeterinary:Veterinary

  constructor(private vetsService: VeterinariesService){}

  ngOnInit(): void {

    // this.vetsService.getVeterinaryByName().subscribe((data:Veterinary)=>{
    //   this.veterinaryWork = data;
    //   console.log("Veterinaries list: " + JSON.stringify(this.veterinaryWork));
    //   })

    this.vetsService.getAllVeterinaries().subscribe((data:Veterinary[])=>{
    this.veterinariesList = data;
    console.log("Veterinaries list: " + JSON.stringify(this.veterinariesList));
    })
  }

  clickAddButton(){
        this.veterinaryWork.id=0;
        this.vetsService.addVeterinary(this.veterinaryWork).subscribe((resp:any)=>{
       console.log(JSON.stringify(resp));
     }); 
      location.reload();
  }

  clickDelButton(){
        this.vetsService.deleteVeterinary(this.veterinaryWork.id).subscribe((resp:any)=>{
       console.log(JSON.stringify(resp));
     });
     location.reload();
  }

  clickFindButton(){
    alert("EDIT");
    this.vetsService.getVeterinaryByName(this.veterinaryWork.name).subscribe((data:Veterinary)=>{
      this.veterinaryWork = data;
      console.log("Veterinaries list: " + JSON.stringify(this.veterinaryWork));
      })
  }

  clickEditButton(){
    this.vetsService.updateVeterinary(this.veterinaryWork).subscribe((resp:any)=>{
   console.log(JSON.stringify(resp));
   }); 
   location.reload();
  }

  clickListItemVet(vet: Veterinary) {
    this.veterinaryWork.id=vet.id;
    this.veterinaryWork.name=vet.name;
    this.veterinaryWork.phone=vet.phone;
    this.veterinaryWork.mail=vet.mail;
    this.veterinaryWork.speciality=vet.speciality;
  }

}
