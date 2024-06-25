import { Component } from '@angular/core';

@Component({
  selector: 'app-veterinaries',
  templateUrl: './veterinaries.component.html',
  styleUrls: ['./veterinaries.component.scss']
})
export class VeterinariesComponent {

  isDisabled = false;
  imgPath = "../assets/img/img5.png";
  selectedVeterinary:any;

   

  veterinaries = [
    {name:"Dr Arc Marcu", phone:"071111111", email:"vetmarcu@gmail.com", speciality:"surgery"},
    
  ]

  clickListItem(veterinary:any){
      this.selectedVeterinary = veterinary;
      console.log("Veterinary list item data: " + JSON.stringify(this.selectedVeterinary));
      console.log("Veterinary list item data: " + JSON.stringify(veterinary));
  }

}
