import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninGoogleComponent } from './signin-google/signin-google.component';
import { HttpClientModule } from '@angular/common/http';
import { AgGridModule } from 'ag-grid-angular';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider
} from "angular-6-social-login";
import { AppsComponent } from './apps/apps.component';
import { EmployeeManagementComponent } from './employee-management/employee-management.component';
import { DirectoryComponent } from './employee-management/directory/directory.component';
import { LeavesComponent } from './employee-management/leaves/leaves.component';
import { ClaimsComponent } from './employee-management/claims/claims.component';
import { PerformanceComponent } from './performance/performance.component';


// Configs 
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("224909876303-sc86d64d82mi28smhek794spnqo0suu5.apps.googleusercontent.com")
        }
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    SigninGoogleComponent,
    AppsComponent,
    EmployeeManagementComponent,
    DirectoryComponent,
    LeavesComponent,
    ClaimsComponent,
    PerformanceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SocialLoginModule,
    HttpClientModule,
    AgGridModule.withComponents([])
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
