import { Component } from '@angular/core';

@Component({
  selector: 'app-security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.scss']
})
export class SecurityComponent {

username: string = "user";
password: string = "password";
errorMessage: string | null = null;

login() {
  console.log ("Login: ");
}

}
