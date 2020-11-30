import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AuthService,
  GoogleLoginProvider
} from 'angular-6-social-login';

@Component({
  selector: 'app-signin-google',
  templateUrl: './signin-google.component.html',
  styleUrls: ['./signin-google.component.scss']
})
export class SigninGoogleComponent implements OnInit {
  isLoggedIn :boolean;
  loggedInUserDetails="";
  loggedInUser = "";
  springapiurl="http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/";
  getServerData: any;
  columnDefs = [
    { field: 'emp_no',sortable: true, filter: true },
    { field: 'birth_date',sortable: true, filter: true },
    { field: 'first_name',sortable: true, filter: true},
    { field: 'last_name',sortable: true, filter: true},
    { field: 'hire_date',sortable: true, filter: true}
];

// rowData = [
//     { Name: 'Varun S', EmployeeID: '725639', Department: "Engineering",Location:"Puducherry",Manager:"Prinu John" },
//     { Name: 'Prinu John', EmployeeID: '725936', Department: "Engineering",Location:"Alapuzha",Manager:"Aarti Ande" },
// ];
rowData:any;
  constructor(private socialAuthService: AuthService,private http: HttpClient) { }
  public socialSignIn(socialPlatform : string) {
    console.log("In socialSignIn Method")
    let socialPlatformProvider="";
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    } 
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log("Data-:"+JSON.stringify(userData));
        console.log(socialPlatform+" sign in data : " , userData);
        this.loggedInUserDetails = "Signed in As '"+userData.name +"' using '"+userData.email+"'";
        this.loggedInUser = userData.name;
        sessionStorage.setItem('loggedInUser', this.loggedInUser);
        sessionStorage.setItem('loggedInEmail',this.loggedInUserDetails);
        this.isLoggedIn=true; 
      }
    );
  }
  public fetchPeersData(){
    console.log("Nav Peers Clicked");
    let apiurl='ONEWORKFORCE/api/getEmployeeDetails?empid=10001';
    let url=this.springapiurl+apiurl;
  console.log("url"+url);
    this.http.get<any>(url).subscribe(data => {
            console.log(JSON.stringify(data));
            this.getServerData = data;
            this.rowData = data;
        })
  }
  ngOnInit() {
    console.log("local->"+sessionStorage.getItem("loggedInUser"));
    if(sessionStorage.hasOwnProperty("loggedInUser")){
     this.isLoggedIn=true;
     this.loggedInUser=sessionStorage.getItem("loggedInUser");
     this.loggedInUserDetails=sessionStorage.getItem("loggedInEmail");
     console.log("local-true->"+this.isLoggedIn);
    }
    else{
      this.isLoggedIn=false;
      this.loggedInUser="Sign in with Google";
      this.loggedInUserDetails="";
      console.log("local-false->"+this.isLoggedIn);
    }
  }



}
