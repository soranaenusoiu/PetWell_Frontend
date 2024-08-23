import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/interfaces/owner';
import { OwnersService } from 'src/app/services/owners.service';

@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']

})
export class OwnersComponent {
  
  // imgPath2 = "../assets/img/img3.jpg";
  //selectedOwner:Owner;
  ownersList: Owner[] = [];
  ownerWork: Owner = { "id": 0, "name": "", "phone": "", "email": "", "address": "" };
  password: string = "";
  // constructor(private owsService: OwnersService) { }
  // owners = [
  //   {name:"Ion Andreescu", phone:"0777777777", email:"ionandreescu@gmail.com", address:"Bulevardul Ion Mihalache, bl C15, apt. 108"},
  //   {name:"Marcela Ionescu", phone:"0111111111", email:"marcelaionescu@gmail.com", address:"Calea Victoriei, nr 14"},
  // ]
  // clickListItem(owner:any){
  //     this.selectedOwner = owner;
  //     console.log("Owner list item data: " + JSON.stringify(this.selectedOwner));
  //     console.log("Owner list item data: " + JSON.stringify(owner));
  // }
  // ngOnInit(): void {
  //   this.owsService.getAllOwners().subscribe((data:Owner[])=>{
  //   this.ownersList = data;
  //     console.log("OWners list: " + JSON.stringify(this.ownersList));
  //   })
  // }
 
  constructor(private owsService: OwnersService) { }

  ngOnInit(): void {
    //  // this.owsService.addOwner().subscribe((resp:any)=>{
    // //   console.log(JSON.stringify(resp));
    // // });
    // this.owsService.getAllOwners().subscribe((data:Owner[])=>{
    // this.ownersList = data;
    //   console.log("Owners list: " + JSON.stringify(this.ownersList));
    // })
    // this.owsService.getOwnerByPhone().subscribe((resp:any)=>{
    //   console.log(JSON.stringify(resp));
    // });
    // this.owsService.putOwner().subscribe((resp:any)=>{
    //   console.log(JSON.stringify(resp));
    // });
    // this.owsService.deleteOwner().subscribe((resp:any)=>{
    //   console.log(JSON.stringify(resp));
    // });
   this.refreshList();
  }

  refreshList() {
    this.owsService.getAllOwners().subscribe((data: Owner[]) => {
      this.ownersList = data;
      console.log("All owners list: " + JSON.stringify(this.ownersList));
    })}

    clickAddButton(){
      this.ownerWork.id = 0;
      if (this.ownerWork.name.length <= 0) return;
      // console.log("Add owner test: " + JSON.stringify(this.ownerWork));
      this.owsService.addOwner({owner: this.ownerWork, password: this.password}).subscribe((resp: any) => {
        console.log("Add owner: " + JSON.stringify(resp));
        this.refreshList();
      });
    }

    clickFindButton(){
      if (this.ownerWork.name.length > 0) {
        this.owsService.getOwnerByName(this.ownerWork.name).subscribe((data: Owner) => {
          this.ownerWork = data;
          console.log("Find owner by name: " + JSON.stringify(this.ownerWork));
        })
        return;
      } 
      if (this.ownerWork.phone.length > 0) {
      this.owsService.getOwnerByPhone(this.ownerWork.phone).subscribe((data: Owner) => {
        this.ownerWork = data;
        console.log("Find owner by phone: " + JSON.stringify(this.ownerWork));
      })
      return;
    }
    // if (this.ownerWork.id.length > 0) {
    //   this.owsService.getOwnerById(this.ownerWork.id).subscribe((data: Owner) => {
    //     this.ownerWork = data;
    //     console.log("Find owner by id: " + JSON.stringify(this.ownerWork));
    //   })
    //   return;
    // }
    }

    clickEditButton(){
      if (this.ownerWork.id == 0){
        return;
      }
      this.owsService.updateOwner(this.ownerWork).subscribe((resp: any) => {
        console.log("Update owner: " + JSON.stringify(resp));
        this.refreshList();
      });
    }

    clickDeleteButton(){
      if (this.ownerWork.id == 0){
        return;
      }
      this.owsService.deleteOwner(this.ownerWork.id).subscribe((resp: any) => {
        console.log("Delete owner : " + JSON.stringify(resp));
        this.refreshList();
      });
    }

    clickResetButton() {
      this.ownerWork.id = 0;
      this.ownerWork.name = "";
      this.ownerWork.phone = "";
      this.ownerWork.email = "";
      this.ownerWork.address = "";
    } 

  clickListItemOw(ow: Owner) {
    this.ownerWork.id = ow.id;
    this.ownerWork.name = ow.name;
    this.ownerWork.phone = ow.phone;
    this.ownerWork.email = ow.email;
    this.ownerWork.address = ow.address;
  }
  
}
