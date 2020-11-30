import { Component, OnInit,Output} from '@angular/core';

import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'One Work Force';
  isLoggedIn :boolean;
  loggedInUserDetails=""
  loggedInUser = ""
  constructor(private socialAuthService: AuthService) { }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider="";
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        this.loggedInUserDetails = "Signed in As '"+userData.name +"' using '"+userData.email+"'";
        this.loggedInUser = userData.name;
        sessionStorage.setItem('loggedInUser', this.loggedInUser);
        sessionStorage.setItem('loggedInEmail',this.loggedInUserDetails);
        this.isLoggedIn=true; 
      }
    );
  }
  ngOnInit() {
    if(sessionStorage.hasOwnProperty("loggedInUser")){
      this.isLoggedIn=true;
      this.loggedInUser=sessionStorage.getItem("loggedInUser");
      this.loggedInUserDetails=sessionStorage.getItem("loggedInEmail");
     }
     else{
       this.isLoggedIn=false;
       this.loggedInUser="Sign in with Google";
       this.loggedInUserDetails="";
     }
  }
 
}
