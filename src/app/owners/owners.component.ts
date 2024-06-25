import { Component, OnInit } from '@angular/core';
import { Owner } from '../interfaces/owner';
import { OwnersService } from '../services/owners.service';



@Component({
  selector: 'app-owners',
  templateUrl: './owners.component.html',
  styleUrls: ['./owners.component.scss']

})
export class OwnersComponent implements OnInit {

  isDisabled = false;
  imgPath2 = "../assets/img/img3.jpg";
  selectedOwner:any;

  ownersList: Owner[] = [];

  constructor(private owsService: OwnersService) { }

  owners = [
    {name:"Ion Andreescu", phone:"0777777777", email:"ionandreescu@gmail.com", address:"Bulevardul Ion Mihalache, bl C15, apt. 108"},
    {name:"Marcela Ionescu", phone:"0111111111", email:"marcelaionescu@gmail.com", address:"Calea Victoriei, nr 14"},
  ]

  clickListItem(owner:any){
      this.selectedOwner = owner;
      console.log("Owner list item data: " + JSON.stringify(this.selectedOwner));
      console.log("Owner list item data: " + JSON.stringify(owner));
  }

  ngOnInit(): void {
    this.owsService.getAllOwners().subscribe((data:Owner[])=>{
    this.ownersList = data;
      console.log("OWners list: " + JSON.stringify(this.ownersList));
    })

  }


}
