import { Owner } from "./owner";

export class Pet {
    id:number;
    species:string;
    breed:string;
    name:string;
    age:number;
    weight:number;
    owner:Owner;
}