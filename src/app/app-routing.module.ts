import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoComponent } from './components/demo/demo.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { OwnersComponent } from './owners/owners.component';
import { PetsComponent } from './components/pets/pets.component';
import { VeterinariesComponent } from './components/veterinaries/veterinaries.component';
import { HomeComponent } from './components/home/home.component';
import { CrudComponent } from './components/crud/crud.component';
import { DetailsComponent } from './components/details/details.component';

const routes: Routes = [

  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'demo',
    component:DemoComponent
  },
  {
    path:'employees',
    component:EmployeesComponent
  },
  {
    path:'owners',
    component:OwnersComponent
  },
  {
    path:'pets',
    component:PetsComponent
  },
  {
    path:'veterinaries',
    component:VeterinariesComponent
  },
  {
    path:'admin',
    component:CrudComponent
  },
  {
    path:'employees/details/:empId',
    component:DetailsComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
