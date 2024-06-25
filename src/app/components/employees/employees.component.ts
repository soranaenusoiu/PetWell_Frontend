import { Component } from '@angular/core';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {

  isDisabled = false;
  imgPath = "../assets/img/img1.jpg";
  imgPath2 = "../assets/img/img3.jpg";
  myDate = new Date(1989,6, 10) //July 10 1989
  selectedEmployee:any;

  // username!:string; 
  username:string = ''; 

  employees = [
    {name:"Andreea", age:21, job:"Software Engineer", company:"Google", department:"IT"},
    {name:"Alexandru", age:31, job:"Analyst", company:"IBM", department:"IT"},
    {name:"Andrei", age:40, job:"Tester", company:"Microsoft", department:"IT"},
    {name:"Mihai", age:26, job:"Database Developer", company:"Oracle", department:"IT"},
    {name:"Maria", age:28, job:"Frontend Developer", company:"Facebook", department:"IT"},
    {name:"Dudoi", age:44, job:"Structurist", company:"Strucky", department:"Civil Engineering"},
  ]

  clickListItem(employee:any){
      this.selectedEmployee = employee;
      console.log("Employee list item data: " + JSON.stringify(this.selectedEmployee));
      console.log("Employee list item data: " + JSON.stringify(employee));
      console.log("Employee's job is: " + employee.job);
  }

  clickButton(){
    alert("Click again");
  }

}
