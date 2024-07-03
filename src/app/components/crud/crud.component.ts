import { Component, OnInit } from '@angular/core';
import { Owner } from 'src/app/interfaces/owner';
import { OwnersService } from 'src/app/services/owners.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.scss']
})
export class CrudComponent implements OnInit {
  ownersList: Owner[] = [];

  constructor(private owsService: OwnersService) { }

  ngOnInit(): void {
    // this.owsService.getAllOwners().subscribe((data:Owner[])=>{
    // this.ownersList = data;
    //   console.log("OWners list: " + JSON.stringify(this.ownersList));
    // })

  }

}
