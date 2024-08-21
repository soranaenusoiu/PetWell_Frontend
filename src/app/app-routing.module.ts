import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnersComponent } from './components/owners/owners.component';
import { PetsComponent } from './components/pets/pets.component';
import { VeterinariesComponent } from './components/veterinaries/veterinaries.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { HomeComponent } from './components/home/home.component';
import { SecurityComponent } from './components/security/security.component';

const routes: Routes = [

  {
    path:'home',
    component:HomeComponent
  },

  {
    path:'appointments',
    component:AppointmentsComponent
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
    path:'schedules',
    component:SchedulesComponent
  },
  {
    path:'security',
    component:SecurityComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
