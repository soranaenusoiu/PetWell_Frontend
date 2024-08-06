import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DetailsComponent } from './components/details/details.component';
import { OwnersComponent } from './components/owners/owners.component';
import { PetsComponent } from './components/pets/pets.component';
import { VeterinariesComponent } from './components/veterinaries/veterinaries.component';
import { SchedulesComponent } from './components/schedules/schedules.component';
import { AppointmentsComponent } from './components/appointments/appointments.component';
import { DATE_PIPE_DEFAULT_OPTIONS } from "@angular/common";
import { AuthInterceptorService } from './services/auth-interceptor.service';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    HomeComponent,
    DetailsComponent,
    OwnersComponent,
    PetsComponent,
    VeterinariesComponent,
    SchedulesComponent,
    AppointmentsComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    HttpClientModule
  ],
  providers: [
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}
    // {
    //   provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: { dateFormat: 'shortDate' }
    // }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  currentDate = new Date();
}

