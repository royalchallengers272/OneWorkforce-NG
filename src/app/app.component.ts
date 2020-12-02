import { Component, OnInit,Output} from '@angular/core';
import { HttpClient } from '@angular/common/http';
// Import the AuthService type from the SDK
import { AuthService } from '@auth0/auth0-angular';
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
  constructor(private http: HttpClient,public auth: AuthService) { }
  public auth0LoginOneWorkForce() {
    this.auth.loginWithRedirect();
  }
  ngOnInit() {
    if(this.auth.isAuthenticated$){
      this.auth.user$.subscribe(result=>{
      this.isLoggedIn=true;
      this.loggedInUser=result.nickname;
      this.loggedInUserDetails="Signed in As '"+result.nickname +"' using '"+result.name+"'";
      var emplIdTemp;
      if(result.name=='raghavadevaraje.urs@sjsu.edu'){
        emplIdTemp = 10001;
        this.isManager=true;
      }
      else {
        emplIdTemp = 10003;
        this.isManager=false;
      }
      this.http.get<any>('http://ec2-52-53-164-188.us-west-1.compute.amazonaws.com:8080/ONEWORKFORCE/api/getEmployeeDetails?empid='+emplIdTemp).subscribe(data => {
          var isManager = data[0].managerflag;
          if(isManager=='Y'){
          this.isManager=true;
          }
          else{
            this.isManager=false;
          }
      })
      });
    }
    else{
      this.isLoggedIn=false;
      this.loggedInUser="Log In";
      this.loggedInUserDetails="";
    }
  }
 
}
