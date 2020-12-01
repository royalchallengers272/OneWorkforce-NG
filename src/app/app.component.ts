import { Component, OnInit,Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
  isManager:boolean;
  constructor(private socialAuthService: AuthService,private http: HttpClient) { }
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
        var emplIdTemp;
        if(userData.email=='varunselva90@gmail.com'){
          emplIdTemp = 10001;
        }
        else if(userData.email=='varunselvakumar90@gmail.com') {
          emplIdTemp = 110567;
        }
        this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getEmployeeDetails?empid='+emplIdTemp).subscribe(data => {
          var isManager = data[0].managerflag;
          if(isManager=='Y'){
            sessionStorage.setItem('isManager', 'yes');
           this.isManager=true;
          }
          else{
            sessionStorage.setItem('isManager', 'no');
            this.isManager=false;
          }
        })
        // this.http.get<any>('http://localhost:4200/api').subscribe(data => {
        //   var isManager = data[0].managerflag;
        //   console.log("isManager",isManager);
        //   if(isManager=='Y'){
        //     sessionStorage.setItem('isManager', 'yes');
        //     console.log("isManagerY",isManager);
        //     this.isManager=true;
        //   }
        //   else{
        //     sessionStorage.setItem('isManager', 'no');
        //     console.log("isManagerN",isManager);
        //     this.isManager=false;
        //   }
        // })
      }
    );
  }
  ngOnInit() {
    if(sessionStorage.hasOwnProperty("loggedInUser")){
      console.log("loggedInUser");
      this.isLoggedIn=true;
      this.loggedInUser=sessionStorage.getItem("loggedInUser");
      this.loggedInUserDetails=sessionStorage.getItem("loggedInEmail");
      if(sessionStorage.getItem("isManager")=="yes"){
        this.isManager=true;
      }
      else{
        this.isManager=false;
      }
     }
     else{
      console.log("else");
       this.isLoggedIn=false;
       this.loggedInUser="Sign in with Google";
       this.loggedInUserDetails="";
      //  this.isManager=false;
     }
  }
 
}
