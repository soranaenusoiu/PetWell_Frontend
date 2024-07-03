import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { Employee } from 'src/app/interfaces/employee';
// import { EmployeesService } from 'src/app/services/employees.service';
import { Owner } from 'src/app/interfaces/owner';
import { Veterinary } from 'src/app/interfaces/veterinary';
import { Pet } from 'src/app/interfaces/pet';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit{

  id!:number;
  // emp!:Employee;
  ow!:Owner;
  pet!: Pet;
  vet!: Veterinary;
  message!: string;

  constructor(private activatedRoute: ActivatedRoute){

  }

  ngOnInit(): void {
    // this.getEmployeeDataById();
  }

  // getEmployeeDataById():void{
  //   // this.id = this.activatedRoute.snapshot.params['empId']
  //   // this.employeesService.getEmployeeById(this.id).subscribe((data:Employee)=>{
  //   //   this.emp = data;
  //   //   console.log("Emp data: " + JSON.stringify(this.emp));
  //   // });
  // }

}
