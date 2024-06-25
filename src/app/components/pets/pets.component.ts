import { Component } from '@angular/core';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent {

  isDisabled = false;
  imgPath1 = "../assets/img/img1.jpg";
  selectedPet:any;

   

  pets = [
    {species:"cat", breed:"common", name:"Mrs. Cuddles", age:"2", weight:"3.7"},
  ]

  clickListItem(pet:any){
      this.selectedPet = pet;
      console.log("Pet list item data: " + JSON.stringify(this.selectedPet));
      console.log("Pet list item data: " + JSON.stringify(pet));
  }


}
