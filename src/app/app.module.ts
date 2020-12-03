import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SigninGoogleComponent } from './signin-google/signin-google.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';
// Import the module from the SDK
import { AuthModule } from '@auth0/auth0-angular';

import { AppsComponent } from './apps/apps.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { DirectoryComponent } from './employee-management/directory/directory.component';
import { LeavesComponent } from './employee-management/leaves/leaves.component';
import { ClaimsComponent } from './employee-management/claims/claims.component';
import { PerformanceComponent } from './performance/performance.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    AppsComponent,
    EmployeeManagementComponent,
    DirectoryComponent,
    LeavesComponent,
    ClaimsComponent,
    PerformanceComponent,
    SigninGoogleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents([]),
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'royalchallengers272.us.auth0.com',
      clientId: 'wPtozXw17LvcxQZLTfgcV5nE37xQsZ7l'
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
