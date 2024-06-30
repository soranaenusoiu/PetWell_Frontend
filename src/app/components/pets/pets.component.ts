import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/interfaces/pet';
import { PetService} from 'src/app/services/pet.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent {
  isDisabled = false;
  imgPath1 = "../assets/img/img1.jpg"
  selectedPet:any;
  
  petList: Pet[] = [];

  constructor(private petService: PetService){}

  ngOnInit(): void {
    this.petService.getAllPets().subscribe((data:Pet[])=>{
    this.petList = data;
    console.log("Pets list: " + JSON.stringify(this.petList));
    })
    this.petService.putPet().subscribe((resp:any)=>{
      console.log(JSON.stringify(resp));
    });
  }

}