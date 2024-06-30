import { Component, OnInit } from '@angular/core';
import { Veterinary } from 'src/app/interfaces/veterinary';
import { VeterinariesService} from 'src/app/services/veterinary.service';

@Component({
  selector: 'app-veterinaries',
  templateUrl: './veterinaries.component.html',
  styleUrls: ['./veterinaries.component.scss']
})
export class VeterinariesComponent {
  // isDisabled = false;
  // imgPath = "../assets/img/img5.png";
  // selectedVeterinary:any;
  // veterinaries = [
  //   {name:"Dr Arc Marcu", phone:"071111111", email:"vetmarcu@gmail.com", speciality:"surgery"},
    
  // ]
  // clickListItem(veterinary:any){
  //     this.selectedVeterinary = veterinary;
  //     console.log("Veterinary list item data: " + JSON.stringify(this.selectedVeterinary));
  //     console.log("Veterinary list item data: " + JSON.stringify(veterinary));
  // }
  veterinariesList: Veterinary[] = [];
  veterinaryGetByName: Veterinary;

  constructor(private vetsService: VeterinariesService){}

  ngOnInit(): void {
    this.vetsService.getAllVeterinaries().subscribe((data:Veterinary[])=>{
    this.veterinariesList = data;
    console.log("Veterinaries list: " + JSON.stringify(this.veterinariesList));
    })

    this.vetsService.putVeterinary().subscribe((resp:any)=>{
      console.log(JSON.stringify(resp));
    });

    this.vetsService.deleteVeterinary().subscribe((resp:any)=>{
      console.log(JSON.stringify(resp));
    });

    // this.vetsService.addVeterinary().subscribe((resp:any)=>{
    //   console.log(JSON.stringify(resp));
    // });
  }


}
