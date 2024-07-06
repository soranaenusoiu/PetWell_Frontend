import { Component, OnInit } from '@angular/core';
import { Pet } from 'src/app/interfaces/pet';
import { PetService} from 'src/app/services/pet.service';
import { Owner } from 'src/app/interfaces/owner';
import { OwnersService } from 'src/app/services/owners.service';

@Component({
  selector: 'app-pets',
  templateUrl: './pets.component.html',
  styleUrls: ['./pets.component.scss']
})
export class PetsComponent {
  
  imgPath1 = "../assets/img/img1.jpg"
 
  ownerWork: Owner = { "id": 0, "name": "", "phone": "", "email": "", "address": "" };
  petList: Pet[] = [];
  petWork: Pet = { "id": 0, "species": "", "breed": "", "name": "", "age": 0, "weight": 0, "owner": this.ownerWork};

  constructor(private petService: PetService, private owsService: OwnersService){}

  ngOnInit(): void {
    // //  this.petService.addPet().subscribe((resp:any)=>{
    // //   console.log(JSON.stringify(resp));
    // // });
    // this.petService.getAllPets().subscribe((data:Pet[])=>{
    // this.petList = data;
    // console.log("Pets list: " + JSON.stringify(this.petList));
    // })
    // this.petService.getPetsByOwner().subscribe((resp:any)=>{
    //   console.log(JSON.stringify(resp));
    // });
    // this.petService.putPet().subscribe((resp:any)=>{
    //   console.log(JSON.stringify(resp));
    // });
    // this.petService.deletePet().subscribe((resp:any)=>{
    //   console.log(JSON.stringify(resp));
    // });
    this.refreshList();
  }
  
  refreshList() {
    this.petService.getAllPets().subscribe((data: Pet[]) => {
      this.petList = data;
      console.log("All pets list: " + JSON.stringify(this.petList));
    })}

    clickAddButton(){
      this.petWork.id = 0;
      if (this.petWork.name.length <= 0) return;
      console.log("Add pet test: " + JSON.stringify(this.petWork));
      this.owsService.getOwnerByName(this.petWork.owner.name).subscribe((data: Owner) => {
        this.petWork.owner =  data;
        console.log("Owner found " + JSON.stringify(this.ownerWork));
        this.petService.addPet(this.petWork).subscribe((resp:any)=>{
          console.log("Pet added " + JSON.stringify(resp));
          this.petService.getAllPets().subscribe((data:Pet[])=>{
            this.petList = data;
            console.log("Pet list " + JSON.stringify(this.petList));
          })
        })
      });
    }

    clickFindButton(){

    }

    clickEditButton(){

    }

    clickDeleteButton(){
      this.petService.deletePet(this.petWork.id).subscribe((resp:any)=>{
        console.log("Delete pet " + JSON.stringify(resp));
        this.petService.getAllPets().subscribe((data: Pet[])=>{
          this.petList = data;
          console.log("Pet list " + JSON.stringify(this.petList));
        })
      });
    }
    clickResetButton() {
      this.petWork.id = 0;
      this.petWork.species = "";
      this.petWork.breed = "";
      this.petWork.name = "";
      this.petWork.age = 0;
      this.petWork.weight = 0;
      this.petWork.owner.name = "";
    } 

  clickListItemPet(pet: Pet) {
    this.petWork.id = pet.id;
    this.petWork.species = pet.species;
    this.petWork.breed = pet.breed;
    this.petWork.name = pet.name;
    this.petWork.age = pet.age;
    this.petWork.weight = pet.weight;
    this.petWork.owner.name = pet.owner.name;
  }


}