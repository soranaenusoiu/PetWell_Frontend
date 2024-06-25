import { Component } from '@angular/core';

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {

}

let lname ='John';
// lname = 10;

console.log(lname);

let numList : Array<number>;
numList = [1,2,3,4,5];
let results = numList.filter((num)=> num> 2);
let num = numList.find((num) => num === 2);
let sum = numList.reduce((acc, num) => acc + num);
console.log(results);
console.log(num);
console.log(sum);

enum Color {
  Red,
  Green,
  Blue,
  Purple
}

let c: Color = Color.Purple;

