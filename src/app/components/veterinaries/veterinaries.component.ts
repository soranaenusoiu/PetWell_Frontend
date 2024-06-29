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

  constructor(private empsService: VeterinariesService){}

  ngOnInit(): void {
    this.empsService.getAllVeterinaries().subscribe((data:Veterinary[])=>{
    this.veterinariesList = data;
    console.log("Veterinaries list: " + JSON.stringify(this.veterinariesList));
    })

  }

}
